define('modules/components/wizard/tabcontent/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"tab-content\">\r\n    <div class=\"alert alert-danger display-none\">\r\n        <button class=\"close\" data-close=\"alert\"></button>\r\n        You have some form errors. Please check below.\r\n    </div>\r\n    <div class=\"alert alert-success display-none\">\r\n        <button class=\"close\" data-close=\"alert\"></button>\r\n        Your form validation is successful!\r\n    </div>\r\n    <slot></slot>\r\n</div>",
      ready: function ready() {}
  });

});
