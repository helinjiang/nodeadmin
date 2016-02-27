define('modules/components/wizard/tabcontent/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"tab-content\">\r\n    <slot></slot>\r\n</div>",
      ready: function ready() {}
  });

});
