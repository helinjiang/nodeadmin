var Model = require('common/model');

var data = $.extend({},
    Model.getNameMap([
        'id',
        'state',
        'stateShow'
    ]), {
        'user_name': '车主人',
        'name': '汽车名字',
        'buydate': '购买日期'
    });


/**
 * 通过filedNameArr，获得一个map，key为name，value为title
 */
function getNameMap(arr) {
    var map = {};

    arr.forEach(function(item) {
        if (typeof data[item] !== 'undefined') {
            map[item] = data[item];
        }
    });

    return map;
}

/**
 * 获得datagrid的items列表
 * arr:['id','name','pwd'],
 * param:{
 *     name:{
 *         css:'namecss'
 *     },
 *     pwd:{
 *         hide:true
 *     }     
 * },
 * items:[{
        name: 'id',
        title: '操作',
        render: 'commonOperate | detail modify delete',
        disableorder: true
    }];
 */
function getDatagridItem(arr, param, items) {
    var result = [];

    arr.forEach(function(fieldName) {
        var item = {
            name: fieldName,
            title: data[fieldName] || fieldName
        };

        if (typeof param[fieldName] === 'object') {
            item = $.extend({}, item, param[fieldName]);
        }

        result.push(item);
    });

    if (items && items.length) {
        result = result.concat(items);
    }

    return result;
}

/**
 * 通过name获取title
 */
function getTitle(name) {
    return data[name];
}

module.exports = {
    data: data,
    getNameMap: getNameMap,
    getDatagridItem: getDatagridItem
};
