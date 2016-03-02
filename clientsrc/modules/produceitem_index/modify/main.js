var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        id: undefined,
        tableName: undefined,
        targetName: undefined,
        targetDesc: undefined,
        menuId: undefined,
        breadcrumb: undefined,
        state: undefined,
    },
    methods: {
        beforeShowModal: function(data) {
            if (!data) {
                return;
            }

            // 初始化数据
            this.id = data.id;
            this.tableName = data.tableName;
            this.targetName =data.targetName;
            this.targetDesc =data.targetDesc;
            this.menuId =data.menuId;
            this.breadcrumb =data.breadcrumb;
            this.state = data.state;
        },
        getRulesOptions: function() {
            var config = {
                targetName: {
                    required: true
                },
                menuId: {
                    required: true
                },
                breadcrumb: {
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
