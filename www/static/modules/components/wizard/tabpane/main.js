define('modules/components/wizard/tabpane/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"tab-pane\" :class=\"css\" :id=\"id\">\r\n    <h3 class=\"block\" v-text=\"title\"></h3>\r\n    <slot></slot>\r\n</div>\r\n",
      props: {
          'id': String,
          'css': String,
          'title': String
      },
      ready: function ready() {}
  });

});
