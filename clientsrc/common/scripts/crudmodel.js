class Model {
    constructor(fieldDefine) {

        this.fieldDefine = fieldDefine || {};

        // map<fieldName, title>
        this.fieldTitleMap = this._getAllFieldTitleMap();

        // datagrid的items
        this.datagridItem = undefined;

        // detail的fieldDefine
        this.detailFieldDefine = undefined;
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
     * 获得datagrid的items。
     *
     * 依赖于各个字段的moduleDatagrid值，该值可以为：
     * 1. 如果为undefined，则其等价为{show:false}
     * 2. 如果boolean值，则其等价为{show:true}或{show:false}
     * 3. 值为对象，其完整定义为： 
     * moduleDatagrid : {
     *     show : true, // 如果要展示，则此值为true，否则可以不定义
     *     priority: 100,  // 优先级，在列表中的顺序，从小到大，不设置的话默认为100
     *     options: { // 额外的参数，用于datagrid上的配置，这里支持哪些配置请参考该组件的用法
     *         css: 'namecss',
     *         hide: false,
     *         disableorder:fase
     *     }
     * }
     * 
     * @param  {array}   extraItems 额外附加items
     * @return {array}              datagrid的items
     */
    getDatagridItem(extraItems) {
        // 优先使用缓存
        if(this.datagridItem){
            return this.datagridItem;
        }

        var arr = Object.keys(this.fieldDefine),
            result = [];

        arr.forEach(fieldName => {
            // 字段的定义对象
            var one = this.fieldDefine[fieldName];

            // 如果设置了展现在datagrid中才展示
            if (typeof one.moduleDatagrid === 'object' && one.moduleDatagrid.show || typeof one.moduleDatagrid === 'boolean' && one.moduleDatagrid) {

                var item = {};
                item.name = fieldName;
                item.title = this.getTitle(fieldName);

                if (typeof one.moduleDatagrid.priority === 'undefined') {
                    item.priority = 100;
                } else {
                    item.priority = parseInt(one.moduleDatagrid.priority, 10) || 100;
                }

                // 额外的datagrid-item参数配置来自one.moduleDatagrid.options
                if (typeof one.moduleDatagrid.options === "object") {
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

        // 缓存数据
        this.datagridItem = result;

        // 返回结果
        return result;
    }

    /**
     * 获得detail的fieldDefine。
     *
     * 依赖于各个字段的moduleDetail值，该值可以为：
     * 1. 如果为undefined，则其等价为{show:false}
     * 2. 如果boolean值，则其等价为{show:true}或{show:false}
     * 3. 值为对象，其完整定义为： 
     * moduleDetail : {
     *     show : true, // 如果要展示，则此值为true，否则可以不定义
     *     priority: 100,  // 优先级，在列表中的顺序，从小到大，不设置的话默认为100
     * }
     * 
     * @param  {array}   extraItems 额外附加items
     * @return {array}              detail的fieldDefine
     */
    getDetailFieldDefine(extraItems) {
         // 优先使用缓存
        if(this.detailFieldDefine){
            return this.detailFieldDefine;
        }

        var arr = Object.keys(this.fieldDefine),
            result = [];

        arr.forEach(fieldName => {
            // 字段的定义对象
            var one = this.fieldDefine[fieldName];

            // 如果设置了展现在datagrid中才展示
            if (typeof one.moduleDetail === 'object' && one.moduleDetail.show || typeof one.moduleDetail === 'boolean' && one.moduleDetail) {
                var item = {};
                item.name = fieldName;
                item.title = this.getTitle(fieldName);

                if (typeof one.moduleDetail.priority === 'undefined') {
                    item.priority = 100;
                } else {
                    item.priority = parseInt(one.moduleDetail.priority, 10) || 100;
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

        // 缓存数据
        this.detailFieldDefine = result;

        // 返回结果
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
