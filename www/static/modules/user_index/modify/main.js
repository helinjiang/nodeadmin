define('modules/user_index/modify/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"modifypage\">\r\n\r\n    <modal title=\"修改用户信息\">\r\n\r\n        <form action=\"#\" class=\"form-horizontal\" role=\"form\">\r\n            <div class=\"form-body\">\r\n                <form-input name=\"id\" title=\"ID\" :value=\"id\" horizontal></form-input>\r\n                <form-input name=\"username\" title=\"用户名\" :value=\"name\" horizontal></form-input>\r\n                <form-input type=\"password\" name=\"password\" title=\"密码\" horizontal></form-input>\r\n            </div>\r\n        </form>\r\n        \r\n    </modal>\r\n\r\n</div>\r\n",
      data: function data() {
          return {
              id: '',
              name: 'test'
          };
      },
      methods: {
          showModal: function showModal(data) {
              this.$set('id', data.id);
  
              this.$children[0].show();
          }
      },
      ready: function ready() {}
  });

});
