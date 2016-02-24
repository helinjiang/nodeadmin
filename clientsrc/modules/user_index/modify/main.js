var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        id: undefined,
        name: undefined,
        state: undefined,
        birthday: undefined
    },
    methods: {
        beforeShowModal: function(data) {
            if (!data) {
                return;
            }

            // 初始化数据
            this.id = data.id;
            this.name = data.name;
            this.state = data.state;
            this.birthday = data.birthday;
        },
        getValidatorConfig: function() {
            var config = {
                name: {
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
                birthday: {
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
