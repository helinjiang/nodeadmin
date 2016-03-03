define('modules/coding_index/add/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"addpage\">\r\n    <button class=\"btn btn-success\" v-on:click=\"showModal\">\r\n        新增 <i class=\"fa fa-plus\"></i>\r\n    </button>\r\n    <modal title=\"新增代码生成器信息\">\r\n        <he-form action=\"/admin/coding/add\" horizontal noactions>\r\n            <he-form-item title=\"数据库表名\" required horizontal>\r\n                <input type=\"text\" name=\"tableName\" v-model=\"tableName\">\r\n            </he-form-item>\r\n            <he-form-item title=\"目标名字\" required horizontal>\r\n                <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n            </he-form-item>\r\n            <he-form-item title=\"目标描述\" horizontal>\r\n                <input type=\"text\" name=\"targetDesc\" v-model=\"targetDesc\">\r\n            </he-form-item>\r\n            <he-form-item title=\"菜单ID\" required horizontal>\r\n                <input type=\"text\" name=\"menuId\" v-model=\"menuId\">\r\n            </he-form-item>\r\n            <he-form-item title=\"面包屑导航\" required horizontal>\r\n                <input type=\"text\" name=\"breadcrumb\" v-model=\"breadcrumb\">\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" required horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: {
          tableName: undefined,
          targetName: undefined,
          targetDesc: undefined,
          menuId: undefined,
          breadcrumb: undefined,
          state: undefined
      },
      methods: {
          beforeShowModal: function beforeShowModal() {
              // TODO 如果上一次关闭弹出框时表单元素验证失败过，则下一次打开错误依然在显示，体验不太好
              this.tableName = '';
              this.targetName = '';
              this.targetDesc = '';
              this.menuId = '';
              this.breadcrumb = '';
              this.state = '1';
          },
          getRulesOptions: function getRulesOptions() {
              var config = {
                  tableName: {
                      required: {
                          rule: true,
                          message: '用户名不能为空！'
                      },
                      minlength: {
                          rule: 3,
                          message: '最小长度为3'
                      },
                      maxlength: {
                          rule: 64,
                          message: '最大长度为64'
                      }
                  },
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
