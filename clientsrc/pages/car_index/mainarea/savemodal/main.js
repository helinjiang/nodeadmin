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

            config.buydate = {
                required: {
                    rule: true,
                    message: '购买日期不能为空！'
                }
            };

            config.ownerId = {
                required: {
                    rule: true,
                    message: '车主人不能为空！'
                }
            };

            if (this.isAdd) {
                config.name = {
                    required: {
                        rule: true,
                        message: '汽车名字不能为空！'
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
            }

            return config;
        },

    },
    ready:function(){
        // 通知 select2 初始化
        this.$broadcast('initselect2');
    }
});
