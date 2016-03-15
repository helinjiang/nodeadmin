class Model {
    constructor(arr, param) {
        this.commonData = {
            'id': 'ID',
            'name': '名字',
            'createTime': '创建时间',
            'updateTime': '更新时间',
            'state': '状态',
            'stateShow': '状态'
        };

        this.data = $.extend({}, this._getMap(arr, this.commonData), param || {});
    }

    /**
     * 通过filedNameArr，获得一个map，key为name，value为title
     */
    getNameMap(arr) {
        return this._getMap(arr, this.data);
    }

    /**
     * 通过name获取title
     */
    getTitle(name) {
        return this.data[name];
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
    getDatagridItem(arr, param, items) {
        var result = [];

        arr.forEach(fieldName => {
            var item = {
                name: fieldName,
                title: this.data[fieldName] || fieldName
            };

            if (param && typeof param[fieldName] === 'object') {
                item = $.extend({}, item, param[fieldName]);
            }

            result.push(item);
        });

        if (items && items.length) {
            result = result.concat(items);
        }

        return result;
    }

    _getMap(arr, param) {
        var map = {};

        arr.forEach(fieldName => {
            if (typeof param[fieldName] !== 'undefined') {
                map[fieldName] = param[fieldName];
            }
        });

        return map;
    }
}

module.exports = Model;
