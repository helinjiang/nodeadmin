var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        codingId: undefined,
        fieldName: undefined,
        cnName: undefined,
        enName: undefined,
        state: undefined,
    },
    methods: {
        beforeShowModal: function() {
            // TODO 如果上一次关闭弹出框时表单元素验证失败过，则下一次打开错误依然在显示，体验不太好
            this.codingId = '';
            this.fieldName = '';
            this.cnName = '';
            this.enName = '';
            this.state = '1';
        },
        getRulesOptions: function() {
            var config = {
                codingId: {
                    required: {
                        rule: true,
                        message: 'codingId不能为空！'
                    }
                },
                fieldName: {
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
