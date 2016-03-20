var Validator = require('common/validator');
var Msg = require('components/msg/main');
var mixinsBasicModal = require('mixins/modal/basic/main');

module.exports = {
    template: '<div>EMPTY</div>',
    data: function() {
        return {
            jqForm: undefined
        };
    },
    props: {
        /**
         * 初始化的值，对象，用于设置模态框中表单初始值
         */
        initData: Object,

        /**
         * save时保存到服务器的Url
         */
        url: {
            type: String,
            required: true
        },

        /**
         * 当前是否为新增页面，因为新增和修改页面会不一样
         */
        isAdd: Boolean,

        /**
         * 标题
         */
        title: String
    },
    mixins: [mixinsBasicModal],
    methods: {
        /**
         * 返回校验器规则，建议覆盖
         */
        getRulesOptions: function() {
            return {};
        },

        beforeModal: function() {
            // 在展示对话框之前，获取到form对象，以便后续处理
            this.jqForm = $('form', this.$el);

            // 也可能没有初始值，比如新增页面
            if (!this.initData) {
                return;
            }

            // 遍历所有的有name属性的表单，并将其设置到vue的data中
            var self = this,
                jqFiledList = this.jqForm.find('[name]');

            jqFiledList.each(function() {
                var fieldName = $(this).attr('name');

                self.$set(fieldName, self.initData[fieldName]);
            });
        },

        /**
         * 对话框确定按钮点击之后的回调函数
         */
        triggerSubmit: function(modalId) {
            if (this.jqForm) {
                this.jqForm.submit();
            } else {
                console.error('this.jqForm is undefined');
            }
        },

        /**
         * 表单校验
         */
        handleValidator: function() {
            var self = this;

            Validator.check(this.jqForm, this.getRulesOptions(), {
                submitHandler: function(form) {
                    $(form).ajaxSubmit({
                        success: function(responseText, statusText) {
                            self.dealSuccessRes(responseText, statusText);
                        },
                        error: function(err) {
                            console.error(err);

                            if (err.status === 500) {
                                Msg.error('内部错误，请联系管理员！');
                            } else {
                                Msg.error('出错了~~！失败原因为：' + JSON.stringify(err));
                            }
                        }
                    });
                }
            });
        },
        dealSuccessRes: function(responseText, statusText) {
            console.log(responseText, statusText);

            if (statusText !== 'success' || responseText.errno !== 0) {
                // 提示失败
                Msg.error('出错了~~！失败原因：' + JSON.stringify(responseText.errmsg));
            } else {
                // 提示成功
                Msg.success('^_^ 处理成功！');

                // 关闭对话框
                this.hideModal();

                // 刷新列表
                this.reportSuccess(responseText.data);
            }
        }
    },
    events: {
        /**
         * 监听子组件中的 'valuechange' 事件，然后对其进行表单校验
         * 
         * @param  {string} name   表单中某一表单元素的name属性值
         * @param  {string} val    新值
         * @param  {string} oldVal 旧值
         * @return {boolean}        校验结果
         */
        valuechange: function(name, val, oldVal) {
            return Validator.valid(this.jqForm, name);
        },
    },
    ready: function() {
        this.handleValidator();
    }
};
