var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        codingName: undefined, // 所属的代码生成器展示名字
        codingId: undefined, // 所属的代码生成器ID
        fieldName: undefined, // 数据库中字段名称
        cnName: undefined, // 中文名称
        dbName: undefined, // 英文名称，用于代码中逻辑实现
        state: undefined, // 状态
        type: undefined, // 类型
        length: undefined, // 长度，只有varchar、char、int类型时有必要设置 TODO 默认值待优化
        defaultVal: undefined, // 默认值
        property: undefined, // 属性，如果是id，需要定义为UNSIGNED
        isNotNull: false, // 是否非空
        isAutoIncrease: false, // 是否自增
        isKey: false, // 是否主键
        isUnique: false, // 是否唯一
        isForeignKey: false, // 是否外键
        comment: undefined, // 注释
    },
    props: {
        'assign': {
            type: Object,
            required: true
        }
    },
    methods: {
        beforeShowModal: function() {
            // TODO 如果上一次关闭弹出框时表单元素验证失败过，则下一次打开错误依然在显示，体验不太好
            this.codingName = this.assign.tableName + '-' + this.assign.targetName + '(' + this.assign.id + ')';
            this.codingId = this.assign.id;
            this.fieldName = '';
            this.cnName = '';
            this.dbName = '';
            this.state = '1';
            this.type = 'varchar';
            this.length = 0;
            this.defaultVal = '';
            this.property = '';
            this.isNotNull = true;
            this.isAutoIncrease = false;
            this.isKey = false;
            this.isUnique = false;
            this.isForeignKey = false;
            this.comment = '';
        },
        getRulesOptions: function() {
            var config = {
                codingId: {
                    required: {
                        rule: true,
                        message: 'codingId不能为空！'
                    }
                },
                fieldName: {
                    required: true
                },
                dbName: {
                    required: true
                },
                state: {
                    required: true
                }
            };

            return config;
        }
    }
});
