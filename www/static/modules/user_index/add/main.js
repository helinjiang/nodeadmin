define('modules/user_index/add/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"addpage\">\r\n\r\n    <button class=\"btn btn-success\" v-on:click=\"showModal\">\r\n        新增 <i class=\"fa fa-plus\"></i>    \r\n    </button>\r\n\r\n    <modal title=\"testtitle\">\r\n\r\n        <form action=\"#\" class=\"form-horizontal\" role=\"form\">\r\n            <div class=\"form-body\">\r\n                <form-input name=\"username\" title=\"用户名\" horizontal></form-input>\r\n                <form-input type=\"password\" name=\"password\" title=\"密码\" horizontal></form-input>\r\n            </div>\r\n        </form>\r\n        \r\n    </modal>\r\n\r\n</div>\r\n",
      methods: {
          showModal: function showModal() {
              this.$children[0].show();
          }
      },
      ready: function ready() {}
  });

});
