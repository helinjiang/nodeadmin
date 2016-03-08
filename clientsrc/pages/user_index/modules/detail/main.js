var Vue = require('lib/vue');

var mixinsSaveModal = require('mixins/savemodal');


module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            items: [],
            modalTitle: '用户信息详情11'
        };
    },
    mixins: [mixinsSaveModal],
    methods: {
        setFormData: function(data) {
            if (!data) {
                return;
            }

            // 设置要展示的信息条目
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
        },
        triggerSubmit: function() {
            this.hideModal();
        }
    }
});
