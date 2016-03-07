define('modules/user_index/add/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"addpage\">\r\n    \r\n    \r\n    <modal title=\"新增用户信息\">\r\n        <he-form action=\"/admin/user/add\" horizontal noactions>\r\n            <he-form-item title=\"用户名\" horizontal>\r\n                <input type=\"text\" name=\"name\" v-model=\"name\">\r\n            </he-form-item>\r\n            <he-form-item title=\"密码\" horizontal>\r\n                <input type=\"password\" name=\"pwd\" v-model=\"pwd\">\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"生日\" horizontal>\r\n                <date name=\"birthday\" :value.sync=\"birthday\"></date>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>   \r\n\r\n    <he-button type=\"success\" icon=\"plus\" v-on:click=\"showModal\">新增</he-button> \r\n\r\n</div>\r\n",
      data: {
          name: undefined,
          pwd: undefined,
          birthday: undefined,
          state: undefined
      },
      methods: {
          beforeShowModal: function beforeShowModal() {
              // TODO 如果上一次关闭弹出框时表单元素验证失败过，则下一次打开错误依然在显示，体验不太好
              this.name = '';
              this.pwd = '';
              this.birthday = '2015-12-12';
              this.state = '1';
          },
          getRulesOptions: function getRulesOptions() {
              var config = {
                  name: {
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
                  pwd: {
                      required: {
                          rule: true,
                          message: '密码不能为空！'
                      },
                      minlength: {
                          rule: 6,
                          message: '最小长度为6'
                      },
                      maxlength: {
                          rule: 32,
                          message: '最大长度为32'
                      }
                  },
                  birthday: {
                      required: {
                          rule: true,
                          message: '生日不能为空！'
                      }
                  }
              };
  
              return config;
          }
      }
  });

});
