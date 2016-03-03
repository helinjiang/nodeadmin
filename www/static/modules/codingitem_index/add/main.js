define('modules/codingitem_index/add/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"addpage\">\r\n    <button class=\"btn btn-success\" v-on:click=\"showModal\">\r\n        新增 <i class=\"fa fa-plus\"></i>\r\n    </button>\r\n    <modal title=\"新增代码生成器item信息\" fullwidth longmodal>\r\n        <he-form action=\"/admin/codingitem/add\" horizontal noactions>\r\n            <div class=\"row\">\r\n\r\n                <div class=\"col-md-6\">\r\n                    <he-form-item title=\"代码生成器\" required horizontal>\r\n                        <input type=\"text\" name=\"codingId\" readonly v-model=\"codingId\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"字段名称\" required horizontal>\r\n                        <input type=\"text\" name=\"fieldName\" v-model=\"fieldName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"中文名称\" horizontal>\r\n                        <input type=\"text\" name=\"cnName\" v-model=\"cnName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"英文名称\" required horizontal>\r\n                        <input type=\"text\" name=\"enName\" v-model=\"enName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"类型\" col=\"3-9\" help=\"可选可输入。时间用什么存储呢？\" required horizontal>\r\n                        <select2 name=\"state\" :value.sync=\"state\">\r\n                            <select2-option title=\"字符串 varchar\" value=\"varchar\"></select2-option>\r\n                            <select2-option title=\"字符串 char\" value=\"char\"></select2-option>\r\n                            <select2-option title=\"整型 int\" value=\"int\"></select2-option>\r\n                            <select2-option title=\"日期 date\" value=\"date\"></select2-option>\r\n                            <select2-option title=\"时间 datetime\" value=\"datetime\"></select2-option>\r\n                            <select2-option title=\"文本 text\" value=\"text\"></select2-option>\r\n                        </select2>\r\n                    </he-form-item>\r\n                    <he-form-item title=\"长度\" col=\"3-9\" help=\"int、char、varchar才需要定义长度\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"默认值\" col=\"3-9\" help=\"可选可输入\" horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"属性\" col=\"3-9\" help=\"下拉选择，比如UNSIGINED\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                </div>\r\n\r\n                <div class=\"col-md-6\">\r\n                    <he-form-item title=\"是否非空\" col=\"3-9\" horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"索引\" col=\"3-9\" help=\"定义主键或唯一信息\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"是否自增\" col=\"3-9\" horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"注释\" col=\"3-9\" help=\"备注和解释\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"外键配置\" col=\"3-9\" help=\"此处可能有多个\" horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"状态\" required horizontal>\r\n                        <select2 name=\"state\" :value.sync=\"state\">\r\n                            <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                            <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                        </select2>\r\n                    </he-form-item>\r\n                </div>\r\n            </div>           \r\n            \r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: {
          codingId: undefined,
          fieldName: undefined,
          cnName: undefined,
          enName: undefined,
          state: undefined
      },
      props: {
          'assign': {
              type: Object,
              required: true
          }
      },
      methods: {
          beforeShowModal: function beforeShowModal() {
              // TODO 如果上一次关闭弹出框时表单元素验证失败过，则下一次打开错误依然在显示，体验不太好
              this.codingId = this.assign.id;
              this.fieldName = '';
              this.cnName = '';
              this.enName = '';
              this.state = '1';
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
                  enName: {
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
