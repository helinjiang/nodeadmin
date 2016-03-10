var Vue = require('lib/vue');

var mixinsSaveModal = require('mixins/modal/crudsave/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    mixins: [mixinsSaveModal],
    methods: {
        /**
         * 校验器规则
         * @return {object} 规则对象
         */
        getRulesOptions: function() {
            var config = {};

            config.state = {
                required: true
            };

            config.birthday = {
                required: {
                    rule: true,
                    message: '生日不能为空！'
                }
            };

            if (this.isAdd) {
                config.name = {
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
                };

                config.pwd = {
                    required: {
                        rule: true,
                        message: '密码不能为空！'
                    },
                    minlength: {
                        rule: 5,
                        message: '最小长度为5'
                    },
                    maxlength: {
                        rule: 32,
                        message: '最大长度为32'
                    }
                };
            }

            return config;
        },

    }
});
