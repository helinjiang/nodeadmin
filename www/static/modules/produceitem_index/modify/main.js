define('modules/produceitem_index/modify/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"modifypage\">\r\n    <modal title=\"修改代码生成器信息\">\r\n        <he-form action=\"/admin/produceitem/modify\" horizontal noactions>\r\n            <he-form-item title=\"ID\" required horizontal>\r\n                <input type=\"text\" name=\"id\" v-model=\"id\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"代码生成器\" required horizontal>\r\n                <input type=\"text\" name=\"produceId\" v-model=\"produceId\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"字段名称\" required horizontal>\r\n                <input type=\"text\" name=\"fieldName\" v-model=\"fieldName\">\r\n            </he-form-item>\r\n            <he-form-item title=\"中文名称\" horizontal>\r\n                <input type=\"text\" name=\"cnName\" v-model=\"cnName\">\r\n            </he-form-item>\r\n            <he-form-item title=\"英文名称\" required horizontal>\r\n                <input type=\"text\" name=\"enName\" v-model=\"enName\">\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" required horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: {
          id: undefined,
          produceId: undefined,
          fieldName: undefined,
          cnName: undefined,
          enName: undefined,
          state: undefined
      },
      methods: {
          beforeShowModal: function beforeShowModal(data) {
              if (!data) {
                  return;
              }
  
              // 初始化数据
              this.id = data.id;
              this.produceId = data.produceId;
              this.fieldName = data.fieldName;
              this.cnName = data.cnName;
              this.enName = data.enName;
              this.state = data.state;
          },
          getRulesOptions: function getRulesOptions() {
              var config = {
                  fieldName: {
                      required: true
                  },
                  cnName: {
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
