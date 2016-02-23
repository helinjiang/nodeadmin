define('modules/widget/clearfix/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('clearfix', {
      template: " <div class=\"clearfix\"></div>",
      ready: function ready() {}
  });

});
