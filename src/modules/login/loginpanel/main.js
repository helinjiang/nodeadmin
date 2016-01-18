var Vue = require('lib/vue');
var validator = require('common/validator');

var TipAlert = require('widget/tipalert/main');
var FormInput = require('widget/forminput/main');
var FormActions = require('widget/formactions/main');
var HeCheckbox = require('widget/hecheckbox/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        TipAlert,
        FormInput,
        FormActions,
        HeCheckbox
    },
    ready: function() {

        handleValidator(this);
    }
});

function handleValidator(vm) {
    validator.check($('.login-form'), {
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
                rule: 6,
                message: '最小长度为6'
            }
        }
    }, {
        invalidHandler: function(event, validator) {
            vm.$refs.alert.show('登录失败，请输入正确的用户名和密码！');
        }
    });
}


var handleLogin = function(vm) {
    $('.login-form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            },
            remember: {
                required: false
            }
        },

        messages: {
            username: {
                required: "用户名不能为空！"
            },
            password: {
                required: "密码不能为空！"
            }
        },

        invalidHandler: function(event, validator) { //display error alert on form submit   
            vm.$refs.alert.show('登录失败，请输入正确的用户名和密码！');
        },

        highlight: function(element) { // hightlight error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        success: function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },

        errorPlacement: function(error, element) {
            error.insertAfter(element.closest('.input-icon'));
        },

        submitHandler: function(form) {
            form.submit();
        }
    });

    $('.login-form input').keypress(function(e) {
        if (e.which == 13) {
            if ($('.login-form').validate().form()) {
                $('.login-form').submit();
            }
            return false;
        }
    });
}

