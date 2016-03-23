var BaseModel = require('common/crudmodel');

class Model extends BaseModel {

}

var fieldDefine = {};

// ID
fieldDefine.id = {
    title: 'ID',
    moduleDatagrid: true,
    moduleModify: {
        show: true,
        options: {
            type: 'input',
            param: {
                readonly: true
            }
        }
    },
    moduleDetail: true,
    moduleDelete: {
        show: true,
        options: {
            deleteDepend: 'id'
        }
    }
};

// 用户名
fieldDefine.name = {
    title: '用户名',
    moduleDatagrid: {
        show: true,
        options: {
            css: 'namecss'
        }
    },
    moduleAdd: {
        show: true,
        options: {
            type: 'input'
        }
    },
    moduleModify: {
        show: true,
        options: {
            type: 'input',
            param: {
                readonly: true
            }
        }
    },
    moduleDetail: true,
    moduleDelete: true,
    validator: {
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
    }
};

// 密码
fieldDefine.pwd = {
    title: '密码',
    moduleAdd: {
        show: true,
        options: {
            type: 'input',
            param: {
                type: 'password'
            }
        }
    },
    validator: {
        required: {
            rule: true,
            message: '密码不能为空！'
        },
        minlength: {
            rule: 5,
            message: '最小长度为5'
        },
        maxlength: {
            rule: 32,
            message: '最大长度为32'
        }
    }
};

// 状态
fieldDefine.state = {
    title: '状态',
    moduleAdd: {
        show: true,
        options: {
            type: 'select2',
            value: '1',
            param: {
                options: [{
                    title: '有效',
                    value: '1'
                }, {
                    title: '无效',
                    value: '-1'
                }]
            }
        }
    },
    moduleModify: {
        show: true,
        options: {
            type: 'select2',
            param: {
                options: [{
                    title: '有效',
                    value: '1'
                }, {
                    title: '无效',
                    value: '-1'
                }]
            }
        }
    },
    validator: {
        required: true
    }
};

// 生日
fieldDefine.birthday = {
    title: '生日',
    moduleDatagrid: true,
    moduleAdd: {
        show: true,
        options: {
            type: 'date',
            value: '2016-03-01'
        }
    },
    moduleModify: {
        show: true,
        options: {
            type: 'date'
        }
    },
    moduleDetail: true,
    moduleDelete: true,
    validator: {
        required: {
            rule: true,
            message: '生日不能为空！'
        }
    }
};

// 创建时间
fieldDefine.createTime = {
    title: '创建时间',
    moduleDatagrid: true
};

// 更新时间
fieldDefine.updateTime = {
    title: '更新时间',
    moduleDatagrid: true
};


// 状态，对应的是state
fieldDefine.stateShow = {
    title: '状态',
    moduleDatagrid: true,
    moduleDetail: true,
    moduleDelete: true
};




module.exports = new Model(fieldDefine);
