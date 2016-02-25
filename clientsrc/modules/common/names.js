// <datagrid-item name="id" title="ID"></datagrid-item>
// <datagrid-item name="name" title="用户名" css="namecss"></datagrid-item>
// <datagrid-item name="pwd" hide></datagrid-item>
// <datagrid-item name="birthday" title="生日"></datagrid-item>
// <datagrid-item name="createTime" title="创建时间"></datagrid-item>
// <datagrid-item name="updateTime" title="最后更新时间"></datagrid-item>
// <datagrid-item name="stateShow" title="状态"></datagrid-item>
// <datagrid-item name="id" title="操作" render="commonOperate | detail modify delete" disableorder></datagrid-item>

var common = {
    'id': 'ID',
    'name': '名字',
    'createTime': '创建时间',
    'updateTime': '更新时间',
    'state': '状态',
    'stateShow': '状态'
};

/**
 * /admin/user
 */
var user = $.extend({}, common, {
    'name': '用户名',
    'pwd': '密码',
    'birthday': '生日'
});


module.exports = {
    user: user

};
