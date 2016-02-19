var Vue = require('lib/vue');

var validator = require('common/validator');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            jqForm: undefined
        };
    },
    methods: {
        showModal: function() {
            this.$children[0].show();
        },
        save: function(msg) {
            console.log('next to save add', msg);

            // 提交表单
            this.jqForm.submit();
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
                        // vm.$refs.alert.show('保存用户信息时出错');
                        alert('保存用户信息时出错');
                    } else {
                        // vm.$refs.alert.hide();
                        alert('保存成功！');
                        // 加载中...
                        // 跳转到主页面
                        // window.location.href = '/admin/';
                    }
                }
            });
        }
    });
}