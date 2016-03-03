define('modules/codingitem_index/add/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"addpage\">\r\n    <button class=\"btn btn-success\" v-on:click=\"showModal\">\r\n        新增 <i class=\"fa fa-plus\"></i>\r\n    </button>\r\n    <modal title=\"新增代码生成器item信息\">\r\n        <he-form action=\"/admin/codingitem/add\" horizontal noactions>\r\n            <he-form-item title=\"代码生成器\" required horizontal>\r\n                <input type=\"text\" name=\"codingId\" v-model=\"codingId\">\r\n            </he-form-item>\r\n            <he-form-item title=\"字段名称\" required horizontal>\r\n                <input type=\"text\" name=\"fieldName\" v-model=\"fieldName\">\r\n            </he-form-item>\r\n            <he-form-item title=\"中文名称\" horizontal>\r\n                <input type=\"text\" name=\"cnName\" v-model=\"cnName\">\r\n            </he-form-item>\r\n            <he-form-item title=\"英文名称\" required horizontal>\r\n                <input type=\"text\" name=\"enName\" v-model=\"enName\">\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" required horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: {
          codingId: undefined,
          fieldName: undefined,
          cnName: undefined,
          enName: undefined,
          state: undefined
      },
      methods: {
          beforeShowModal: function beforeShowModal() {
              // TODO 如果上一次关闭弹出框时表单元素验证失败过，则下一次打开错误依然在显示，体验不太好
              this.codingId = '';
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
