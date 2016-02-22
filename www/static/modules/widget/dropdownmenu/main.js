define('modules/widget/dropdownmenu/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('dropdown-menu', {
      template: "<ul class=\"dropdown-menu {{css}}\">\r\n    <slot></slot>\r\n</ul>\r\n",
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
