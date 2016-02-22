var Vue = require('lib/vue');

var validator = require('common/validator');
var Msg = require('/modules/widget/msg/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            items: []
        };
    },
    methods: {
        showModal: function(data) {
            this.items = [{
                key: 'id',
                value: data.id,
                title: 'ID'
            }, {
                key: 'user_name',
                value: data.user_name,
                title: '车主人'
            }, {
                key: 'name',
                value: data.name,
                title: '汽车名字'
            }, {
                key: 'buydate',
                value: data.buydate,
                title: '购买日期'
            }, {
                key: 'stateShow',
                value: data.stateShow,
                title: '状态'
            }];

            this.$children[0].show();
        },
        hideModal: function() {
            this.$children[0].hide();
        }
    },
    ready: function() {

    }
});
