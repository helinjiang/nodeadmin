var Vue = require('lib/vue');

var mixinsSaveModal = require('mixins/modal/crudsave/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            id: undefined,
            name: undefined,
            pwd: undefined,
            birthday: undefined,
            state: undefined,
        };
    },
    props: {
        url: {
            type: String,
            required: true
        },
        isAdd: Boolean,
        title: String
    },
    mixins: [mixinsSaveModal],
    methods: {
        setInitData: function(data) {
            if (!data) {
                return;
            }

            // 初始化数据
            this.id = data.id;
            this.name = data.name;
            this.pwd = data.pwd;
            this.state = data.state;
            this.birthday = data.birthday;
        },
        getRulesOptions: function() {
            // TODO 根据isAdd来设置校验
            var config = {
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
                        rule: 5,
                        message: '最小长度为5'
                    },
                    maxlength: {
                        rule: 32,
                        message: '最大长度为32'
                    }
                },
                birthday: {
                    required: {
                        rule: true,
                        message: '生日不能为空！'
                    }
                }
            };

            return config;
        },

    }
});
