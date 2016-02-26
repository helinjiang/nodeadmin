define('modules/components/portlet/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('portlet', {
      template: "<div class=\"portlet\" :id=\"id\">\r\n    <div class=\"portlet-title\">\r\n        <div class=\"caption\">\r\n            <i class=\"fa fa-{{icon}}\" v-if=\"icon\"></i>{{ title }}\r\n            <slot name=\"title\"></slot>\r\n        </div>\r\n        <div class=\"tools\"></div>\r\n    </div>\r\n    <div class=\"portlet-body\" :class=\"bodycss\">\r\n        <slot></slot>\r\n    </div>\r\n</div>                  \r\n",
      props: {
          id: String,
          'title': String,
          'icon': String,
          'bodycss': String
      },
      ready: function ready() {}
  });

});
