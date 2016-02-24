var Vue = require('lib/vue');

var validator = require('common/validator');
var Msg = require('components/msg/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            jqForm: undefined,
            id: undefined,
            name: undefined,
            state: undefined,
            birthday: undefined
        };
    },
    methods: {
        showModal: function(data) {
            this.id = data.id;
            this.name = data.name;
            this.state = data.state;
            this.birthday = data.birthday;

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
        handleValidator: function() {
            var self = this;

            validator.check(this.jqForm, {
                name: {
                    required: {
                        rule: true,
                        message: '用户名不能为空！'
                    },
                    minlength: {
                        rule: 3,
                        message: '最小长度为3'
                    },
                    maxlength: {
                        rule: 64,
                        message: '最大长度为64'
                    }
                },
                birthday: {
                    required: {
                        rule: true,
                        message: '生日不能为空！'
                    }
                }
            }, {
                submitHandler: function(form) {
                    $(form).ajaxSubmit({
                        success: function(responseText, statusText) {
                            console.log(responseText, statusText);

                            if (statusText !== 'success' || responseText.errno !== 0) {
                                // 提示失败
                                Msg.error('保存出错！失败原因为：' + JSON.stringify(responseText.errmsg));
                            } else {
                                // 提示成功
                                Msg.success('保存成功！');

                                // 关闭对话框
                                self.hideModal();

                                // 刷新列表
                                self.reportSuccess(responseText.data);
                            }
                        },
                        error: function(err) {
                            console.error(err);

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
    },
    events: {
        valuechange: function(name, val, oldVal) {
            validator.valid(this.jqForm, name);
        }
    },
    ready: function() {
        this.jqForm = $('form', this.$el);

        this.handleValidator();
    }
});
