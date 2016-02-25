define('modules/car_index/add/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"addpage\">\r\n    <button class=\"btn btn-success\" v-on:click=\"showModal\">\r\n        新增 <i class=\"fa fa-plus\"></i>\r\n    </button>\r\n    <modal title=\"新增汽车信息\">\r\n        <he-form action=\"/admin/car/add\" horizontal noactions>\r\n            <he-form-item title=\"汽车名\" horizontal>\r\n                <input type=\"text\" name=\"name\" v-model=\"name\">\r\n            </he-form-item>\r\n            <he-form-item title=\"车主人\" horizontal>\r\n                <select2 name=\"ownerId\" :value.sync=\"ownerId\" url=\"/admin/user/getdata\" convert=\"searchuser\" lazy v-ref:user></select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"购买日期\" horizontal>\r\n                <date name=\"buydate\" :value.sync=\"buydate\"></date>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: {
          name: undefined,
          ownerId: undefined,
          buydate: undefined,
          state: undefined
      },
      methods: {
          beforeShowModal: function beforeShowModal() {
              this.name = '';
              this.ownerId = undefined;
              this.buydate = '2016-02-25'; // TODO today
              this.state = '1';
  
              this.$refs.user.init();
          },
          getValidatorConfig: function getValidatorConfig() {
              var config = {
                  name: {
                      required: {
                          rule: true,
                          message: '汽车名字不能为空！'
                      }
                  },
                  ownerId: {
                      required: {
                          rule: true,
                          message: '车主人不能为空！'
                      }
                  },
                  buydate: {
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
