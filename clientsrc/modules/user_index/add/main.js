var CommonCrud = require('common/crud');

/**
 * 初始默认值
 */
var defaultData = {
    name: '',
    pwd: '',
    birthday: '2015-12-12',
    state: '1'
};


module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        name: defaultData.name,
        pwd: defaultData.pwd,
        birthday: defaultData.birthday,
        state: defaultData.state,
    },
    methods: {
        beforeShowModal: function() {
            this.name = defaultData.name;
            this.pwd = defaultData.pwd;
            this.birthday = defaultData.birthday;
            this.state = defaultData.state;
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
                pwd: {
                    required: {
                        rule: true,
                        message: '密码不能为空！'
                    },
                    minlength: {
                        rule: 6,
                        message: '最小长度为6'
                    },
                    maxlength: {
                        rule: 32,
                        message: '最大长度为32'
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
