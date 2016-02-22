define('modules/widget/formactions/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"form-actions\">\r\n    <slot>willreplace</slot>\r\n</div>\r\n"
  });

});
