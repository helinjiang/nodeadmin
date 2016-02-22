define('modules/login_index/container/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"content\">\r\n    <slot></slot>\r\n</div>\r\n",
      ready: function ready() {}
  });

});
