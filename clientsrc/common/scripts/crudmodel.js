class Model {
    constructor(fieldDefine) {

        this.fieldDefine = fieldDefine || {};

        // map<fieldName, title>
        this.fieldTitleMap = this._getAllFieldTitleMap();

        // datagrid的items
        this.datagridItem = undefined;

        // add的fieldDefine
        this.addFieldDefine = undefined;

         // modify的fieldDefine
        this.modifyFieldDefine = undefined;

        // detail的fieldDefine
        this.detailFieldDefine = undefined;

        // delete的fieldDefine
        this.deleteFieldDefine = undefined;
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
     *     [{
                name: 'id',
                title: '操作',
                render: 'commonOperate | detail modify delete',
                disableorder: true,
                priority: 100
            }]
     * @return {array}              datagrid的items
     */
    getDatagridItem(extraItems) {
        // 优先使用缓存
        if (this.datagridItem) {
            return this.datagridItem;
        }

        var result = this._getComputedFieldDefine('moduleDatagrid', extraItems, function(item, oneFieldDefine) {
            // datagrid只认name，而不认识fieldName
            item.name = item.fieldName;

            // 额外的datagrid参数配置，来自oneFieldDefine.moduleDatagrid.options
            if (typeof oneFieldDefine.moduleDatagrid.options === "object") {
                $.extend(item, oneFieldDefine.moduleDatagrid.options);
            }

            return item;
        });

        // 缓存数据
        this.datagridItem = result;

        // 返回结果
        return result;
    }

    /**
     * 获得add的fieldDefine。
     *
     * 依赖于各个字段的moduleAdd值，该值可以为：
     * 1. 如果为undefined，则其等价为{show:false}
     * 2. 如果boolean值，则其等价为{show:true}或{show:false}
     * 3. 值为对象，其完整定义为： 
     * moduleAdd: {
        show: true,
        priority: 100,
        options: {
            type: 'input',
            param: {
                type: 'password'
            }
        }
    }
     * 
     * @param  {array}   extraItems 额外附加items
     *     [{
                fieldName: 'id',
                title: 'ID',
                priority: 100,
                elementType: 'input',
                elementParam: {
                    type: 'password'
                },
                validator: {
                    required: true
                }          
            }]
     * @return {array}              add的fieldDefine
     */
    getAddFieldDefine(extraItems) {
        // 优先使用缓存
        if (this.addFieldDefine) {
            return this.addFieldDefine;
        }

        var result = this._getComputedFieldDefine('moduleAdd', extraItems, function(item, oneFieldDefine) {

            // options
            if (typeof oneFieldDefine.moduleAdd.options === "object") {
                item.elementType = oneFieldDefine.moduleAdd.options.type;
                item.elementParam = oneFieldDefine.moduleAdd.options.param || {};
            }

            // validator
             if (typeof oneFieldDefine.validator=== "object") {
                item.validator = oneFieldDefine.validator;
            }

            return item;
        });

        // 缓存数据
        this.addFieldDefine = result;

        // 返回结果
        return result;
    }


     /**
     * 获得modify的fieldDefine。
     *
     * 依赖于各个字段的moduleModify值，该值可以为：
     * 1. 如果为undefined，则其等价为{show:false}
     * 2. 如果boolean值，则其等价为{show:true}或{show:false}
     * 3. 值为对象，其完整定义为： 
     * moduleModify: {
        show: true,
        priority: 100,
        options: {
            type: 'input',
            param: {
                type: 'password'
            }
        }
    }
     * 
     * @param  {array}   extraItems 额外附加items
     *     [{
                fieldName: 'id',
                title: 'ID',
                priority: 100,
                elementType: 'input',
                elementParam: {
                    type: 'password'
                },
                validator: {
                    required: true
                }          
            }]
     * @return {array}              modify的fieldDefine
     */
    getModifyFieldDefine(extraItems) {
        // 优先使用缓存
        if (this.modifyFieldDefine) {
            return this.modifyFieldDefine;
        }

        var result = this._getComputedFieldDefine('moduleModify', extraItems, function(item, oneFieldDefine) {

            // options
            if (typeof oneFieldDefine.moduleModify.options === "object") {
                item.elementType = oneFieldDefine.moduleModify.options.type;
                item.elementParam = oneFieldDefine.moduleModify.options.param || {};
            }

            // validator
             if (typeof oneFieldDefine.validator=== "object") {
                item.validator = oneFieldDefine.validator;
            }

            return item;
        });

        // 缓存数据
        this.modifyFieldDefine = result;

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
     *     [{
                fieldName: 'id',
                title: 'ID',
                priority: 100
            }]
     * @return {array}              detail的fieldDefine
     */
    getDetailFieldDefine(extraItems) {
        // 优先使用缓存
        if (this.detailFieldDefine) {
            return this.detailFieldDefine;
        }

        var result = this._getComputedFieldDefine('moduleDetail', extraItems);

        // 缓存数据
        this.detailFieldDefine = result;

        // 返回结果
        return result;
    }

    /**
     * 获得delete的fieldDefine。
     *
     * 依赖于各个字段的moduleDelete值，该值可以为：
     * 1. 如果为undefined，则其等价为{show:false}
     * 2. 如果boolean值，则其等价为{show:true}或{show:false}
     * 3. 值为对象，其完整定义为： 
     * moduleDelete: {
     *     show : true, // 如果要展示，则此值为true，否则可以不定义
     *     priority: 100,  // 优先级，在列表中的顺序，从小到大，不设置的话默认为100
     *     options: {
    *           deleteDepend: 'pid' // 删除记录时，需要依赖它，例如: pid=one.id
    *       }
     * }
     * 
     * @param  {array}   extraItems 额外附加items
     *     [{
                fieldName: 'id',
                title: 'ID',
                priority: 100
            }]
     * @return {array}              detail的fieldDefine
     */
    getDeleteFieldDefine(extraItems) {
        // 优先使用缓存
        if (this.deleteFieldDefine) {
            return this.deleteFieldDefine;
        }

        var result = this._getComputedFieldDefine('moduleDelete', extraItems, function(item, oneFieldDefine) {

            // 额外参数配置，来自oneFieldDefine.moduleDelete.options
            if (typeof oneFieldDefine.moduleDelete.options === "object") {
                $.extend(item, oneFieldDefine.moduleDelete.options);
            }

            return item;
        });

        // 缓存数据
        this.deleteFieldDefine = result;

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


    /**
     * 获得计算之后的fieldDefine数组
     * @param  {string}   targetField model中的字段目标属性，比如moduleDatagrid等
     * @param  {array}   extraItems  额外的要合并的结果项数组
     * @param  {function}   dealFn      处理每一个字段回调处理，返回处理结果
     *                                  第一个参数是当前处理的item对象，
     *                                  第二个参数是当前处理的字段定义对象
     * @return {array}               计算之后的fieldDefine数组
     */
    _getComputedFieldDefine(targetField, extraItems, dealFn) {

        var arr = Object.keys(this.fieldDefine),
            result = [];

        arr.forEach(fieldName => {
            // 字段的定义对象
            var one = this.fieldDefine[fieldName];

            // 如果设置了展现才展示，设置fieldName\title\priority
            if (typeof one[targetField] === 'object' && one[targetField].show || typeof one[targetField] === 'boolean' && one[targetField]) {

                var item = {};
                item.fieldName = fieldName;
                item.title = this.getTitle(fieldName);

                if (typeof one[targetField].priority === 'undefined') {
                    item.priority = 100;
                } else {
                    item.priority = parseInt(one[targetField].priority, 10) || 100;
                }

                if (typeof dealFn === "function") {
                    item = dealFn(item, one);
                }

                result.push(item);
            }
        });

        // 如果有额外参数配置，则合并之
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

        // 返回结果
        return result;
    }

}

module.exports = Model;
