var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            hide: true,
            id: undefined,
            name: undefined,
            pwd: undefined,
            birthday: undefined,
            state: undefined,
        };
    },
    props: {
        /**
         * input 的name 值，必须
         */
        initData: {
            type: Object,
            required: true
        },
    },
    computed: {
        isAdd: function() {
            return !this.id;
        }
    },
    methods: {
        /**
         * 弹出对话框
         */
        showModal: function() {
            // 初始化form data
            this.setFormData(this.initData);

            this.$children[0].show();
        },

        /**
         * 关闭对话框
         */
        hideModal: function() {
            this.$children[0].hide();
            this.hide = true;
        },

        setFormData: function(data) {
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
                        rule: 6,
                        message: '最小长度为6'
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
        }
    },
    ready: function() {
        this.showModal();
    }
});
