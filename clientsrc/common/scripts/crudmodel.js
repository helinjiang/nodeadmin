class Model {
    constructor(fieldDefine) {

        this.fieldDefine = fieldDefine || {};

        // map<fieldName, title>
        this.fieldTitleMap = this._getAllFieldTitleMap();
    }

    /**
     * 通过指定字段，返回对应的字段对象
     * @param  {array}   arr 字段列表
     * @return {object}       map
     */
    getFieldTitleMap(arr) {
        if (!arr || !arr.length) {
            return this.fieldTitleMap;
        }

        var map = {};
        arr.forEach(fieldName => {
            map[fieldName] = this.fieldTitleMap[fieldName];
        });

        return map;
    }


    /**
     * 获取指定的字段的title
     * @param  {string}   fieldName 字段
     * @return {string}        字段对应的titile
     */
    getTitle(fieldName) {
        return this.fieldTitleMap[fieldName] || fieldName;
    }

    /**
     * 获得datagrid的items
     *
     * moduleDatagrid : {
     *     show : true, // 如果要展示，则此值为true，否则可以不定义moduleDatagrid
     *     priority: 100,  // 优先级，在列表中的顺序，从小到大，不设置的话默认为100
     *     options: { // 额外的参数，用于datagrid上的配置，这里支持哪些配置请参考该组件的用法
     *         css: 'namecss',
     *         hide: false,
     *         disableorder:fase
     *     }
     *     
     * 
     * }
     * 
     * @param  {array}   extraItems 额外附加items
     * @return {array}              datagrid的items
     */
    getDatagridItem(extraItems) {
        var arr = Object.keys(this.fieldDefine),
            result = [];

        arr.forEach(fieldName => {
            // 字段的定义对象
            var one = this.fieldDefine[fieldName];

            // 如果设置了展现在datagrid中才展示
            if (one.moduleDatagrid && one.moduleDatagrid.show) {
                var item = {};
                item.name = fieldName;
                item.title = this.getTitle(fieldName);
                item.priority = one.moduleDatagrid.priority || 100;

                // 额外的datagrid-item参数配置来自one.moduleDatagrid.options
                if (one.moduleDatagrid.options) {
                    $.extend(item, one.moduleDatagrid.options);
                }

                result.push(item);
            }
        });

        // 如果有额外的datagrid-item参数配置，则合并之
        if (extraItems && extraItems.length) {
            result = result.concat(extraItems);
        }

        // 依据权重进行排序，权重值从小到大排列
        result = result.sort((a, b) => {
            if (!a.priority) {
                a.priority = 100
            }

            if (!b.priority) {
                b.priority = 100
            }

            return a.priority - b.priority;
        });

        return result;
    }

    /**
     * 获得所有字段的字段名和名称键值对
     * @return {object}   map
     */
    _getAllFieldTitleMap() {
        var arr = Object.keys(this.fieldDefine),
            map = {};

        arr.forEach(fieldName => {
            map[fieldName] = this.fieldDefine[fieldName].title || fieldName;
        });

        return map;
    }
}

module.exports = Model;
