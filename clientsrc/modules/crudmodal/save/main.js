var Vue = require('lib/vue');
var Validator = require('common/validator');
var Msg = require('components/msg/main');
var mixinsBasicModal = require('mixins/modal/basic/main');

Vue.component('crud-modal-save', {
    template: __inline('main.html'),
    data: function() {
        return {
            jqForm: undefined,
            items: [],
            validatorOptions: {}
        };
    },
    props: {
        /**
         * 初始化的值，对象，用于设置模态框中表单初始值
         */
        initData: {
            type: Object,
            'default': function() {
                return {};
            }
        },

        /**
         * 字段定义数据，数组，每个字段用什么来展示
         */
        fieldDefine: {
            type: Array,
            required: true
        },

        /**
         * save时保存到服务器的Url
         */
        url: {
            type: String,
            required: true
        },

        /**
         * 标题
         */
        title: String
    },
    mixins: [mixinsBasicModal],
    methods: {
        beforeModal: function() {
            // 在展示对话框之前，获取到form对象，以便后续处理
            this.jqForm = $('form', this.$el);

            /**
             *
             * fieldName：字段名称
             * elementType：DOM元素类型
             * elementParam：针对DOM元素的更多配置
             * 
             */

            var items = [],
                validatorOptions = {};

            this.fieldDefine.forEach(item => {
                var fieldName = item.fieldName;

                // 如果有初始值，则设置之
                if (this.initData[fieldName]) {
                    item.value = this.initData[fieldName];
                }

                // 补充一些默认值
                switch (item.elementType) {
                    case 'input':
                        if (!item.elementParam) {
                            item.elementParam = {
                                type: 'text'
                            }
                        } else if (!item.elementParam.type) {
                            item.elementParam.type = 'text';
                        }
                        break;
                    case 'select2':
                        if (!item.elementParam) {
                            item.elementParam = {
                                options: []
                            }
                        } else if (!item.elementParam.options) {
                            item.elementParam.options = [];
                        }
                        break;
                    default:
                        break;

                }

                items.push(item);

                // validator
                if (item.validator) {
                    validatorOptions[fieldName] = item.validator;
                }

                // 设置vue的data字段及其初始值
                // this.$set(fieldName, this.initData[fieldName]);
            });

            this.items = items;

            this.validatorOptions = validatorOptions;
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

            Validator.check(this.jqForm, this.validatorOptions, {
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
});
