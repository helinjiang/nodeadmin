define('modules/index_index/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<h1>欢迎！</h1>",
      ready: function ready() {}
  });

});
