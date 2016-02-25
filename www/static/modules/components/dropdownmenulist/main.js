define('modules/components/dropdownmenulist/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('dropdown-menu-list', {
      template: "<ul class=\"dropdown-menu-list scroller\" style=\"height: 250px;\">\r\n    <slot></slot>\r\n</ul>\r\n",
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
