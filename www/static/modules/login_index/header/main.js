define('modules/login_index/header/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"logo\">\r\n    <a href=\"index.html\">\r\n        <img src=\"/static/img/logo.png\" alt=\"logo\" />\r\n    </a>\r\n</div>\r\n",
      ready: function ready() {}
  });

});
