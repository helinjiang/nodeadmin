define('modules/components/wizard/progress/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div id=\"bar\" class=\"progress progress-striped\" role=\"progressbar\">\r\n    <div class=\"progress-bar progress-bar-success\"></div>\r\n</div>\r\n",
      ready: function ready() {}
  });

});
