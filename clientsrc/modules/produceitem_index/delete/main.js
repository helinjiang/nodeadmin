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
                key: 'tableName',
                value: data.tableName,
                title: '数据库表名'
            }, {
                key: 'targetName',
                value: data.targetName,
                title: '目标名字'
            }, {
                key: 'stateShow',
                value: data.stateShow,
                title: '状态'
            }];
        },
        triggerSubmit: function() {
            var self = this;

            $.post('/admin/produce/delete', {
                id: this.id
            }, function(responseText, statusText) {
                self.dealSuccessRes(responseText, statusText);
            });
        }
    }
});
