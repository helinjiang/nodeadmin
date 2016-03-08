var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        id: undefined,
        items: []
    },
    methods: {
        beforeShowModal: function(data) {
            if (!data || !data.id) {
                return;
            }

            // 设置要删除的记录的id
            this.id = data.id;

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
            var self = this;

            $.post('/admin/user/delete', {
                id: this.id
            }, function(responseText, statusText) {
                self.dealSuccessRes(responseText, statusText);
            });
        }
    }
});
