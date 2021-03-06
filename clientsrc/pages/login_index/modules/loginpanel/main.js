var Vue = require('lib/vue');

var Validator = require('common/validator');
var Msg = require('components/msg/main');
var Loading = require('components/loading/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            jqForm: undefined
        };
    },
    methods: {
        getRulesOptions: function() {
            return {
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
            };
        },

        handleValidator: function() {
            Validator.check(this.jqForm, this.getRulesOptions(), {
                submitHandler: function(form) {
                    // http://malsup.com/jquery/form/
                    $(form).ajaxSubmit({
                        success: function(responseText, statusText) {
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
        },

        handleEnter: function() {
            var self = this;
            $('input', this.jqForm).keypress(function(e) {
                if (e.which == 13) {
                    if (self.jqForm.validate().form()) {
                        self.jqForm.submit();
                    }
                    return false;
                }
            });
        }
    },
    ready: function() {
        this.jqForm = $(this.$el);

        this.handleValidator();

        this.handleEnter();
    }
});
