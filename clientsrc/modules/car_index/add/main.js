var Vue = require('lib/vue');

var validator = require('common/validator');
var Msg = require('components/msg/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            jqForm: undefined
        };
    },
    methods: {
        showModal: function() {
            this._reset();
            this.$refs.user.init();

            this.$children[0].show();
        },
        hideModal: function() {
            this.$children[0].hide();
        },
        reportSuccess: function(data) {
            this.$dispatch('savesuccess', data);
        },
        saveSubmit: function(msg) {
            // 提交表单
            this.jqForm.submit();
        },
        checkOwnerId: function(name) {
            this.jqForm.valid();
        },
        _reset: function() {
            // TODO select2 的初始化
            $('[name="name"]', this.jqForm).val('');
        }
    },
    ready: function() {
        // 缓存该值，避免重复获取
        this.$set('jqForm', $('form', $(this.$el)));

        _init(this);
    }
});

function _init(vm) {
    $(function() {
        handleValidator(vm);
    });
}


function handleValidator(vm) {
    validator.check(vm.jqForm, {
        name: {
            required: {
                rule: true,
                message: '汽车名字不能为空！'
            }
        },
        ownerId: {
            required: {
                rule: true,
                message: '车主人不能为空！'
            }
        }
    }, {
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                success: function(responseText, statusText) {
                    if (statusText !== 'success' || responseText.errno !== 0) {
                        // 提示失败
                        Msg.error('保存' + JSON.stringify(responseText.data) + '出错！');
                    } else {
                        // 提示成功
                        Msg.success('保存' + JSON.stringify(responseText.data) + '成功！');

                        // 关闭对话框
                        vm.hideModal();

                        // 刷新列表
                        vm.reportSuccess(responseText.data);
                    }
                }
            });
        }
    });
}