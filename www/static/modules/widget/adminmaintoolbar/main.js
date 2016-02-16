define('modules/widget/adminmaintoolbar/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('admin-main-toolbar', {
      template: "<div class=\"table-toolbar\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">  \r\n            <slot></slot>\r\n        </div>      \r\n    </div>\r\n</div>",
      ready: function ready() {}
  });

});
