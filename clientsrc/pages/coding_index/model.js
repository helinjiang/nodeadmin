var BaseModel = require('common/model');

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
