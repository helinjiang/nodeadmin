var Vue = require('lib/vue');

var validator = require('common/validator');
var Msg = require('components/msg/main');
var Loading = require('components/loading/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            jqForm: undefined
        };
    },
    ready: function() {
        this.jqForm = $(this.$el);

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
            }
        },
        password: {
            required: {
                rule: true,
                message: '密码不能为空！'
            },
            minlength: {
                rule: 3,
                message: '最小长度为3'
            }
        }
    }, {
        submitHandler: function(form) {
            // http://malsup.com/jquery/form/
            $(form).ajaxSubmit({
                success: function(responseText, statusText) {
                    console.log(responseText, statusText);
                    if (statusText !== 'success' || responseText.errno !== 0) {
                        Msg.error('登录失败，请输入正确的用户名和密码！');
                    } else {
                        Loading.show('登录成功，正在跳转...');

                        // 跳转到主页面
                        window.location.href = '/admin/';
                    }
                },
                error: function(err) {
                    // {readyState: 4, responseText: "{"errno":500,"errmsg":"Connection refused, mysql:/…thinkjs.org/doc/error_message.html#econnrefused"}", responseJSON: Object, status: 500, statusText: "Internal Server Error"}
                    if (err.status === 500) {
                        Msg.error('内部错误，请联系管理员！');
                    } else {
                        Msg.error('登录失败！');
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
