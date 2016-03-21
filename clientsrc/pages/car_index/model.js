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

// 汽车名字
fieldDefine.name = {
    title: '汽车名字',
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
        required: true
    }
};

// 车主人
fieldDefine.user_name = {
    title: '车主人',
    moduleDatagrid: true
};

// 车主人
fieldDefine.ownerId = {
    title: '车主人',
    moduleAdd: {
        show: true,
        options: {
            type: 'select2',
            value: '1',
            param: {
                lazy: true,
                convert: 'searchuser',
                url: '/admin/user/getdata'
            }
        }
    },
    moduleModify: {
        show: true,
        options: {
            type: 'select2',
            param: {
                lazy: true,
                convert: 'searchuser',
                url: '/admin/user/getdata'
            }
        }
    },
    validator: {
        required: true
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

// 购买日期
fieldDefine.buydate = {
    title: '购买日期',
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
        required: true
    }
};


// 状态，对应的是state
fieldDefine.stateShow = {
    title: '状态',
    moduleDatagrid: true,
    moduleDetail: true,
    moduleDelete: true
};




module.exports = new Model(fieldDefine);
