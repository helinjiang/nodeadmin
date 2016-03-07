/**
 * 后期再提供解析当前数据库结构，根据sql语句反解析
 */

var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            stepItems: [{
                target: '#tab1',
                title: '基础配置'
            }, {
                target: '#tab2',
                title: '数据库配置'
            }, {
                target: '#tab3',
                title: '新增页'
            }, {
                target: '#tab4',
                title: 'Confirm'
            }],
            rulesOptions: {
                fieldName: {
                    required: true
                },
                dbName: {
                    required: true
                },
                type: {
                    required: true
                }
            },
            fieldName: '', // 字段名称
            cnName: '', // 中文名称
            state: '1', // 字段状态
            remark: '', // 备注
            isDb: true, // 是否为数据库字段
            dbName: '', // 数据库中字段名称
            dbTemplate: '', // 数据库字段模版，用于快速设定常用的字段
            type: 'varchar', // 类型
            length: 0, // 长度，只有varchar、char、int类型时有必要设置 TODO 默认值待优化
            defaultVal: '', // 默认值
            property: '', // 属性，如果是id，需要定义为UNSIGNED
            isNotNull: true, // 是否非空
            isAutoIncrease: false, // 是否自增
            isKey: false, // 是否主键
            isUnique: false, // 是否唯一
            isForeignKey: false, // 是否外键
            comment: '', // 数据库注释
            isInList: true, // 是否在列表页中出现
            isInAdd: false, // 是否在新增页中出现
            isInModify: false, // 是否在修改页中出现
            isInDetail: false, // 是否在详情页中出现
            isInDelete: false, // 是否在删除页中出现
        };
    },
    props: {
        'title': String,
        'codingId': {
            required: true,
            type: Number
        }
    },
    methods: {
        /**
         * 点击取消按钮后，触发的一个事件，用于通知父组件关闭本页面，恢复初始状态
         */
        backToInit: function() {
            this.$dispatch('backtoinit');
        },
    },
    ready: function() {
        console.log('save... ready!');

    }
});
