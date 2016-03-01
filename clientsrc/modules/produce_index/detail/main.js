var CommonCrud = require('common/crud');

var Names = require('common/names');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        items: []
    },
    methods: {
        beforeShowModal: function(data) {
            if (!data) {
                return;
            }

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
            this.hideModal();
        }
    }
});
