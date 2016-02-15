var Vue = require('lib/vue');
var validator = require('common/validator');

var TipAlert = require('widget/tipalert/main');
var FormActions = require('widget/formactions/main');
var HeCheckbox = require('widget/hecheckbox/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            formElem: undefined
        }
    },
    components: {
        TipAlert,
        FormActions,
        HeCheckbox
    },
    ready: function() {
        // 缓存该值，避免重复获取
        this.$set('formElem', $(this.$el));

        handleValidator(this);

        handleEnter(this);
    }
});

function handleValidator(vm) {
    validator.check(vm.formElem, {
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

function handleEnter(vm) {
    $('input', vm.formElem).keypress(function(e) {
        if (e.which == 13) {
            if (vm.formElem.validate().form()) {
                vm.formElem.submit();
            }
            return false;
        }
    });
}
