define('modules/components/hebutton/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('he-button', {
      template: "<button class=\"btn btn-{{type}}\">\r\n    <slot></slot> <i class=\"fa fa-{{icon}}\" v-if=\"icon\"></i>\r\n</button>",
      props: {
          type: {
              type: String,
              'default': 'default'
          },
          icon: String
      },
      ready: function ready() {}
  });

});
