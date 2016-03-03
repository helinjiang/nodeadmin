define('modules/coding_index/modify/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"modifypage\">\r\n    <modal title=\"修改代码生成器信息\">\r\n        <he-form action=\"/admin/coding/modify\" horizontal noactions>\r\n            <he-form-item title=\"ID\" required horizontal>\r\n                <input type=\"text\" name=\"id\" v-model=\"id\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"数据库表名\" required horizontal>\r\n                <input type=\"text\" name=\"tableName\" v-model=\"tableName\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"目标名字\" required horizontal>\r\n                <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n            </he-form-item>\r\n            <he-form-item title=\"目标描述\" horizontal>\r\n                <input type=\"text\" name=\"targetDesc\" v-model=\"targetDesc\">\r\n            </he-form-item>\r\n            <he-form-item title=\"菜单ID\" required horizontal>\r\n                <input type=\"text\" name=\"menuId\" v-model=\"menuId\">\r\n            </he-form-item>\r\n            <he-form-item title=\"面包屑导航\" required horizontal>\r\n                <input type=\"text\" name=\"breadcrumb\" v-model=\"breadcrumb\">\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" required horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: {
          id: undefined,
          tableName: undefined,
          targetName: undefined,
          targetDesc: undefined,
          menuId: undefined,
          breadcrumb: undefined,
          state: undefined
      },
      methods: {
          beforeShowModal: function beforeShowModal(data) {
              if (!data) {
                  return;
              }
  
              // 初始化数据
              this.id = data.id;
              this.tableName = data.tableName;
              this.targetName = data.targetName;
              this.targetDesc = data.targetDesc;
              this.menuId = data.menuId;
              this.breadcrumb = data.breadcrumb;
              this.state = data.state;
          },
          getRulesOptions: function getRulesOptions() {
              var config = {
                  targetName: {
                      required: true
                  },
                  menuId: {
                      required: true
                  },
                  breadcrumb: {
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
