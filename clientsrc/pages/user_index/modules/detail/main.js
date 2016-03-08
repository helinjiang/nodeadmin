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

            // 设置要展示的信息条目
            var fields = ['id', 'name', 'birthday', 'stateShow', 'createTime', 'updateTime'],
                map = Names.user;

            this.items = fields.map(function(field) {
                return {
                    key: field,
                    value: data[field],
                    title: map[field]
                };
            });
        },
        triggerSubmit: function() {
            this.hideModal();
        }
    }
});
