define('modules/login_index/loginfooter/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<!-- BEGIN COPYRIGHT -->\r\n<div class=\"copyright\">\r\n    2016 &copy; <a href=\"https://github.com/helinjiang/nodeadmin\" target=\"_blank\">NodeAdmin</a>.\r\n</div>\r\n<!-- END COPYRIGHT -->",
      ready: function ready() {}
  });

});
