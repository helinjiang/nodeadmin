define('modules/test_index/testwizard/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"test-wizard\">\r\n\r\n    <wizard></wizard>\r\n\r\n</div>\r\n",
      ready: function ready() {}
  });

});
