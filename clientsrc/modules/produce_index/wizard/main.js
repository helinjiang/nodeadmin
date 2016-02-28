var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            username: '',
            fullname: '',
            remarks: '',
            card_name: '',
            title: '代码生成器',
            stepItems: [{
                target: '#tab1',
                title: '数据库配置'
            }, {
                target: '#tab2',
                title: '列表页'
            }, {
                target: '#tab3',
                title: '新增页'
            }, {
                target: '#tab4',
                title: 'Confirm'
            }],
            rulesOptions: {
                //account
                username: {
                    minlength: 5,
                    required: true
                },
                //profile
                fullname: {
                    required: true
                },
                //payment
                card_name: {
                    required: true
                }
            }
        };
    },
    ready: function() {

    }
});
