var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        id: undefined,
        name: undefined,
        ownerId: undefined,
        state: undefined,
        buydate: undefined
    },
    methods: {
        beforeShowModal: function(data) {
            if (!data) {
                return;
            }

            // 初始化数据
            this.id = data.id;
            this.name = data.name;
            this.ownerId = data.ownerId;
            this.state = data.state;
            this.buydate = data.buydate;

            this.$refs.user.init();
        },
        getRulesOptions: function() {
            var config = {
                ownerId: {
                    required: {
                        rule: true,
                        message: '车主人不能为空！'
                    }
                },
                buydate: {
                    required: {
                        rule: true,
                        message: '生日不能为空！'
                    }
                }
            };

            return config;
        }
    }
});
