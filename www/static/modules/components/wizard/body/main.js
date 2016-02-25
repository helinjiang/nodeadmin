define('modules/components/wizard/body/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"form-body\">\r\n    <slot></slot>\r\n</div>",
      ready: function ready() {}
  });

});
