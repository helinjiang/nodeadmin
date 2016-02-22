var Vue = require('lib/vue');

var validator = require('common/validator');
var Msg = require('/modules/widget/msg/main');

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
        _reset: function(){
            // TODO 还有select2等组件也要恢复初始
            $('[name="name"], [name="pwd"]', this.jqForm).val('');
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
                message: '用户名不能为空！'
            },
            minlength: {
                rule: 2,
                message: '最小长度为2'
            },
            maxlength: {
                rule: 6,
                message: '最大长度为6'
            }
        },
        pwd: {
            required: {
                rule: true,
                message: '密码不能为空！'
            },
            minlength: {
                rule: 6,
                message: '最小长度为6'
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