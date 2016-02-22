define('modules/login_index/loginheader/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<!-- BEGIN LOGO -->\r\n<div class=\"logo\">\r\n    <a href=\"index.html\">\r\n        <!-- <img src=\"/static/img/logo.png\" alt=\"\" /> -->\r\n        <h1>NodeAdmin 后台管理系统1</h1>\r\n    </a>\r\n</div>\r\n<!-- END LOGO -->",
      ready: function ready() {}
  });

});
