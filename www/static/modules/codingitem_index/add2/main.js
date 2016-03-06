define('modules/codingitem_index/add2/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"addpage\">\r\n    <button class=\"btn btn-success\" v-on:click=\"showModal\">\r\n        新增 <i class=\"fa fa-plus\"></i>\r\n    </button>\r\n    <modal title=\"新增代码生成器字段信息\" fullwidth longmodal>\r\n        <he-form action=\"/admin/codingitem/add\" horizontal noactions>\r\n            <div class=\"row\">\r\n\r\n                <div class=\"col-md-6\">\r\n                    <he-form-item title=\"代码生成器\" required horizontal>\r\n                        <input type=\"text\" name=\"codingName\" readonly v-model=\"codingName\">\r\n                        <input type=\"hidden\" name=\"codingId\" v-model=\"codingId\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"字段名称\" required horizontal>\r\n                        <input type=\"text\" name=\"fieldName\" v-model=\"fieldName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"中文名称\" horizontal>\r\n                        <input type=\"text\" name=\"cnName\" v-model=\"cnName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"英文名称\" required horizontal>\r\n                        <input type=\"text\" name=\"dbName\" v-model=\"dbName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"类型\" col=\"3-9\" required horizontal>\r\n                        <select2 name=\"type\" :value.sync=\"type\">\r\n                            <select2-option title=\"字符串 varchar\" value=\"varchar\"></select2-option>\r\n                            <select2-option title=\"字符串 char\" value=\"char\"></select2-option>\r\n                            <select2-option title=\"整型 int\" value=\"int\"></select2-option>\r\n                            <select2-option title=\"日期 date\" value=\"date\"></select2-option>\r\n                            <select2-option title=\"时间 datetime\" value=\"datetime\"></select2-option>\r\n                            <select2-option title=\"文本 text\" value=\"text\"></select2-option>\r\n                        </select2>\r\n                    </he-form-item>\r\n                    <he-form-item title=\"长度\" col=\"3-9\" horizontal v-show=\"['varchar', 'char', 'int'].indexOf(type) > -1\">\r\n                        <input type=\"text\" name=\"length\" v-model=\"length\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"默认值\" col=\"3-9\" horizontal>\r\n                        <input type=\"text\" name=\"defaultVal\" v-model=\"defaultVal\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"属性\" col=\"3-9\" horizontal>\r\n                        <select2 name=\"property\" allow-clear  :value.sync=\"property\">\r\n                            <select2-option title=\"UNSIGNED\" value=\"UNSIGINED\"></select2-option>\r\n                        </select2>\r\n                    </he-form-item>\r\n                </div>\r\n\r\n                <div class=\"col-md-6\">\r\n                    <he-form-item title=\"选项\" col=\"3-9\" horizontal>\r\n                        <div class=\"checkbox-list\">\r\n                            <he-checkbox name=\"isNotNull\" title=\"是否非空\" :checked.sync=\"isNotNull\"></he-checkbox>\r\n                            <he-checkbox name=\"isAutoIncrease\" title=\"是否自增\" :checked.sync=\"isAutoIncrease\"></he-checkbox>\r\n                            <he-checkbox name=\"isKey\" title=\"是否主键\" :checked.sync=\"isKey\"></he-checkbox>\r\n                            <he-checkbox name=\"isUnique\" title=\"是否唯一\" :checked.sync=\"isUnique\"></he-checkbox>\r\n                            <he-checkbox name=\"isForeignKey\" title=\"是否外键\" :checked.sync=\"isForeignKey\"></he-checkbox>\r\n                        </div>\r\n                    </he-form-item>\r\n                    <he-form-item title=\"外键配置\" col=\"3-9\" help=\"格式： tableName-key\" horizontal v-show=\"isForeignKey\">\r\n                        <input type=\"text\" name=\"foreignConfig\" v-model=\"foreignConfig\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"注释\" col=\"3-9\" horizontal>\r\n                        <textarea name=\"comment\" v-model=\"comment\" rows=\"3\"></textarea>\r\n                    </he-form-item>                    \r\n                    <he-form-item title=\"状态\" required horizontal>\r\n                        <select2 name=\"state\" :value.sync=\"state\">\r\n                            <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                            <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                        </select2>\r\n                    </he-form-item>\r\n                </div>\r\n            </div>           \r\n            \r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
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
          comment: undefined },
      // 注释
      props: {
          'assign': {
              type: Object,
              required: true
          }
      },
      methods: {
          beforeShowModal: function beforeShowModal() {
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
          getRulesOptions: function getRulesOptions() {
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

});
