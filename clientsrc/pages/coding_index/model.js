var BaseModel = require('common/crudmodel');

class Model extends BaseModel {

}

module.exports = new Model([
    'id',
    'state',
    'stateShow'
], {
    'tableName': '数据库表名',
    'targetName': '目标名字',
    'targetDesc': '目标描述',
    'menuId': '菜单ID',
    'breadcrumb': '面包屑导航'
});


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

// tableName
fieldDefine.tableName = {
    title: '数据库表名',
    moduleDatagrid: true,
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

/**
 * 管理系统的命名，要求为英文，例如think_coding对应的coding。
 * 
 * 主要用于以下场景：
 * 1. 在程序中的处理，例如定义controller\model\logic等
 * 2. url链接地址，例如/admin/coding/add等
 * 3. 菜单的ID，例如menuCoding
 * 4. 页面的独有class类，例如page-coding，以便用来特殊的样式控制等
 * 
 * @type {Object}
 */
fieldDefine.managerName = {
    title: 'key值',
    moduleDatagrid: true,
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

/**
 * 管理系统的中文名称，例如think_coding对应的代码生成器。
 * 
 * 主要用于以下场景：
 * 1. 标题等
 * 2. 注释等
 * 
 * @type {Object}
 */
fieldDefine.managerTitle = {
    title: '中文命名',
    moduleDatagrid: true,
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



// 状态，对应的是state
fieldDefine.stateShow = {
    title: '状态',
    moduleDatagrid: true,
    moduleDetail: true,
    moduleDelete: true
};




module.exports = new Model(fieldDefine);
