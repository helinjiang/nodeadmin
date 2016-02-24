define('modules/user_index/modify/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"modifypage\">\r\n    <modal title=\"修改用户信息\" v-on:confirm=\"saveSubmit\">\r\n        <he-form action=\"/admin/user/modify\" horizontal noactions>\r\n            <he-form-item title=\"ID\" horizontal>\r\n                <input type=\"text\" name=\"id\" v-model=\"id\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"用户名\" horizontal>\r\n                <input type=\"text\" name=\"name\" v-model=\"name\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"生日\" horizontal>\r\n                <date name=\"birthday\" :value.sync=\"birthday\"></date>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: {
          id: undefined,
          name: undefined,
          state: undefined,
          birthday: undefined
      },
      methods: {
          beforeShowModal: function beforeShowModal(data) {
              if (data) {
                  this.id = data.id;
                  this.name = data.name;
                  this.state = data.state;
                  this.birthday = data.birthday;
              }
          },
          getValidatorConfig: function getValidatorConfig() {
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
