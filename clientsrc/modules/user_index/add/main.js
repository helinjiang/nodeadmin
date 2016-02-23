var Vue = require('lib/vue');

var validator = require('common/validator');
var Msg = require('/modules/widget/msg/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            jqForm: undefined,
            birthday: '2015-12-12',
            state: '1'
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
        _reset: function() {
            // TODO 还有select2等组件也要恢复初始
            $('[name="name"], [name="pwd"]', this.jqForm).val('');

            console.log('_resetnow', this.state, this.$refs.state.value);

            this.state = '1';
            this.birthday = '2015-12-12';
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
                pwd: {
                    required: {
                        rule: true,
                        message: '密码不能为空！'
                    },
                    minlength: {
                        rule: 6,
                        message: '最小长度为6'
                    },
                    maxlength: {
                        rule: 32,
                        message: '最大长度为32'
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
                                self.hideModal();

                                // 刷新列表
                                self.reportSuccess(responseText.data);
                            }
                        }
                    });
                }
            });
        }
    },
    ready: function() {
        this.jqForm = $('form', this.$el);

        this.handleValidator();
    }
});
