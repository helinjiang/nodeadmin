define('modules/module_admin/footer/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  var App = require('modules/common/app');
  
  Vue.component('admin-footer', {
      template: "<div class=\"footer\">\r\n\r\n    <div class=\"footer-inner\">\r\n         2016 &copy; Hello, world!\r\n    </div>\r\n    <div class=\"footer-tools\">\r\n        <span class=\"go-top\">\r\n        <i class=\"fa fa-angle-up\"></i>\r\n        </span>\r\n    </div>\r\n\r\n</div>",
      ready: function ready() {
          _init();
      }
  });
  
  function _init() {
      $(function () {
          handleGoTop(); //handles scroll to top functionality in the footer
      });
  }
  
  // Handles the go to top button at the footer
  var handleGoTop = function handleGoTop() {
      /* set variables locally for increased performance */
      jQuery('.footer').on('click', '.go-top', function (e) {
          App.scrollTo();
          e.preventDefault();
      });
  };

});
