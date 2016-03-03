var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        id: undefined,
        produceId: undefined,
        fieldName: undefined,
        cnName: undefined,
        enName: undefined,
        state: undefined,
    },
    methods: {
        beforeShowModal: function(data) {
            if (!data) {
                return;
            }

            // 初始化数据
            this.id = data.id;
            this.produceId = data.produceId;
            this.fieldName =data.fieldName;
            this.cnName =data.cnName;
            this.enName =data.enName;
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
                enName: {
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
