var Vue = require('lib/vue');
var validator = require('common/validator');

var FormActions = require('widget/formactions/main');
var HeCheckbox = require('widget/hecheckbox/main');

var Msg = require('/modules/widget/msg/main');
var Loading = require('/modules/widget/loading/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            jqForm: undefined
        };
    },
    components: {
        FormActions,
        HeCheckbox
    },
    ready: function() {
        // 缓存该值，避免重复获取
        this.$set('jqForm', $(this.$el));

        _init(this);
    }
});

function _init(vm) {
    $(function() {

        handleValidator(vm);

        handleEnter(vm);

    });
}

function handleValidator(vm) {
    validator.check(vm.jqForm, {
        username: {
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
        password: {
            required: {
                rule: true,
                message: '密码不能为空！'
            },
            minlength: {
                rule: 2,
                message: '最小长度为6'
            }
        }
    }, {
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                success: function(responseText, statusText) {     
                    console.log(responseText, statusText);
                    if (statusText !== 'success' || responseText.errno !== 0) {
                        vm.$refs.alert.show('登录失败，请输入正确的用户名和密码！');
                    } else {
                        vm.$refs.alert.hide();
                        Msg.success('登录成功，正在跳转...');
                        Loading.show('登录成功，正在跳转...');
                        // 加载中...
                        // 跳转到主页面
                        window.location.href = '/admin/';
                    }
                }
            });
        }
    });
}

function handleEnter(vm) {
    $('input', vm.jqForm).keypress(function(e) {
        if (e.which == 13) {
            if (vm.jqForm.validate().form()) {
                vm.jqForm.submit();
            }
            return false;
        }
    });
}
