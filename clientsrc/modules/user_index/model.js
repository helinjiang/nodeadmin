
/**
 * 描述定义
 * @type {Object}
 */
var user = [{
    name: 'id', // 字段名
    title: 'ID', // 显示的名字
    isDbTableField: true, // 是否为数据库中表字段
    isPrimaryKey: true, // 是否为数据表中的主键
    require: true, // 是否是必须的
    type: 'number', // 类型
    length: 11,

    isShowInIndex: true, // 是否在首页的表格中展示
    isShowInDetail: true, // 是否在详情页面展示
    isShowInDelete: true, // 是否在删除页面展示
    isShowInAdd: false, // 是否在新增页面展示
    isShowInModify: true, // 是否在修改页面展示

    /**
     * autoincrement: 自增长
     * readonly: 只读不能修改
     * inputtext: <input type="text"></input>
     */
    howToAdd: 'autoincrement', // 如何新增
    howToModify: 'readonly', // 如何修改

    // 首页表格的配置
    indexDatagridOptions: {
        // index: 0, // 在列表中的位置，越小则越靠前
        // title:'ID', // 如果不设置则默认获取通用的title
        // css:'idCss',
        // disableOrder:false
        // render:'xxx'        
    }
}, {
    name: 'name',
    title: '用户名',
    isDbTableField: true,
    isPrimaryKey: false,
    require: true,
    type: 'string',
    length: 64,

    isShowInIndex: true,
    isShowInDetail: true,
    isShowInDelete: true,
    isShowInAdd: true,
    isShowInModify: true,

    howToAdd: 'inputtext',
    howToModify: 'readonly',

    indexDatagridOptions: {
        // index: 0, // 在列表中的位置，越小则越靠前
        // title:'ID', // 如果不设置则默认获取通用的title
        // css:'idCss',
        // disableOrder:false
        // render:'xxx'        
    }
}];


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
var userw = $.extend({}, common, {
    'name': '用户名',
    'pwd': '密码',
    'birthday': '生日'
});


module.exports = {
    user: user

};