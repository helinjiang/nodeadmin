var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        name: undefined,
        ownerId: undefined,
        buydate: undefined,
        state: undefined,
    },
    methods: {
        beforeShowModal: function() {
            this.name = '';
            this.ownerId = undefined;
            this.buydate = '2016-02-25'; // TODO today
            this.state = '1';
	    
	    this.$refs.user.init();
        },
        getRulesOptions: function() {
            var config = {
                name: {
                    required: {
                        rule: true,
                        message: '汽车名字不能为空！'
                    }
                },
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
