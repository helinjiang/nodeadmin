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
                key: 'produceId',
                value: data.produceId,
                title: '代码生成器'
            }, {
                key: 'fieldName',
                value: data.fieldName,
                title: '字段名称'
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
