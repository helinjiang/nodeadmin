define('modules/components/dropdown/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('dropdown', {
      template: "<li class=\"dropdown {{css}}\" id=\"{{id}}\">    \r\n    <slot></slot>   \r\n</li>\r\n",
      props: {
          'id': {
              type: String,
              'default': ''
          },
          'css': {
              type: String,
              'default': ''
          }
      },
      ready: function ready() {}
  });

});
