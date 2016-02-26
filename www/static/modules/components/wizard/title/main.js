define('modules/components/wizard/title/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<span class=\"step-title\" v-text=\"value\"></span>",
      props: {
          value: String
      },
      ready: function ready() {}
  });

});
