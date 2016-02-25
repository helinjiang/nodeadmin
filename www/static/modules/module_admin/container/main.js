define('modules/module_admin/container/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('admin-container', {
      template: "<div class=\"page-container\">\r\n    <slot name=\"menu\"></slot>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"page-content\">              \r\n            <slot name=\"title\"></slot>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <slot></slot>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
      ready: function ready() {}
  });

});
