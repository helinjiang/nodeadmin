define('modules/user_index/modify/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"modifypage\">\r\n    <modal title=\"修改用户信息\">\r\n        <he-form action=\"/admin/user/save\" noactions>\r\n            <he-form-item title=\"ID\">\r\n                <input type=\"text\" name=\"id\" :value=\"id\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"用户名\">\r\n                <input type=\"text\" name=\"name\" :value=\"name\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"密码\">\r\n                <input type=\"password\" name=\"pwd\">\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: function data() {
          return {
              id: '',
              name: ''
          };
      },
      methods: {
          showModal: function showModal(data) {
              this.$set('id', data.id);
              this.$set('name', data.name);
  
              this.$children[0].show();
          }
      },
      ready: function ready() {}
  });

});
