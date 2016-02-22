define('modules/login_index/footer/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"copyright\">\r\n    2016 &copy; <a href=\"https://github.com/helinjiang/nodeadmin\" target=\"_blank\">NodeAdmin</a>.\r\n</div>\r\n",
      ready: function ready() {}
  });

});
