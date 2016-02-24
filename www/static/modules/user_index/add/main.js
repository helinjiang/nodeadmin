define('modules/user_index/add/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  /**
   * 初始默认值
   */
  var defaultData = {
      name: '',
      pwd: '',
      birthday: '2015-12-12',
      state: '1'
  };
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"addpage\">\r\n    <button class=\"btn btn-success\" v-on:click=\"showModal\">\r\n        新增 <i class=\"fa fa-plus\"></i>\r\n    </button>\r\n    <modal title=\"新增用户信息\" v-on:confirm=\"saveSubmit\">\r\n        <he-form action=\"/admin/user/add\" horizontal noactions>\r\n            <he-form-item title=\"用户名\" horizontal>\r\n                <input type=\"text\" name=\"name\" v-model=\"name\">\r\n            </he-form-item>\r\n            <he-form-item title=\"密码\" horizontal>\r\n                <input type=\"password\" name=\"pwd\" v-model=\"pwd\">\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"生日\" horizontal>\r\n                <date name=\"birthday\" :value.sync=\"birthday\"></date>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: {
          name: defaultData.name,
          pwd: defaultData.pwd,
          birthday: defaultData.birthday,
          state: defaultData.state
      },
      methods: {
          beforeShowModal: function beforeShowModal() {
              this.name = defaultData.name;
              this.pwd = defaultData.pwd;
              this.birthday = defaultData.birthday;
              this.state = defaultData.state;
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
