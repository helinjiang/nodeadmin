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
                key: 'name',
                value: data.name,
                title: '用户名'
            }, {
                key: 'birthday',
                value: data.birthday,
                title: '生日'
            }, {
                key: 'stateShow',
                value: data.stateShow,
                title: '状态'
            }, {
                key: 'createTime',
                value: data.createTime,
                title: '创建时间'
            }, {
                key: 'updateTime',
                value: data.updateTime,
                title: '最后修改时间'
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
