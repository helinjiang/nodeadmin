define('modules/components/portlet/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('portlet', {
      template: "<div class=\"portlet\">\r\n    <div class=\"portlet-title\">\r\n        <div class=\"caption\">\r\n            <i class=\"fa fa-{{icon}}\" v-if=\"icon\"></i>{{ title }}\r\n        </div>\r\n        <div class=\"tools\"></div>\r\n    </div>\r\n    <div class=\"portlet-body\">\r\n        <slot></slot>\r\n    </div>\r\n</div>                  \r\n",
      props: {
          'title': String,
          'icon': String
      },
      ready: function ready() {}
  });

});
