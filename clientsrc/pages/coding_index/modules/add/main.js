var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        tableName: undefined,
        targetName: undefined,
        targetDesc: undefined,
        menuId: undefined,
        breadcrumb: undefined,
        state: undefined,
    },
    methods: {
        beforeShowModal: function() {
            // TODO 如果上一次关闭弹出框时表单元素验证失败过，则下一次打开错误依然在显示，体验不太好
            this.tableName = '';
            this.targetName = '';
            this.targetDesc = '';
            this.menuId = '';
            this.breadcrumb = '';
            this.state = '1';
        },
        getRulesOptions: function() {
            var config = {
                tableName: {
                    required: {
                        rule: true,
                        message: '用户名不能为空！'
                    },
                    minlength: {
                        rule: 3,
                        message: '最小长度为3'
                    },
                    maxlength: {
                        rule: 64,
                        message: '最大长度为64'
                    }
                },
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
