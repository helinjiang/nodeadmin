var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        id: undefined,
        codingId: undefined,
        fieldName: undefined,
        cnName: undefined,
        dbName: undefined,
        state: undefined,
    },
    methods: {
        beforeShowModal: function(data) {
            if (!data) {
                return;
            }

            // 初始化数据
            this.id = data.id;
            this.codingId = data.codingId;
            this.fieldName =data.fieldName;
            this.cnName =data.cnName;
            this.dbName =data.dbName;
            this.state = data.state;
        },
        getRulesOptions: function() {
            var config = {
                fieldName: {
                    required: true
                },
                cnName: {
                    required: true
                },
                dbName: {
                    required: true
                },
                state: {
                    required: true
                }
            };

            return config;
        }
    }
});
