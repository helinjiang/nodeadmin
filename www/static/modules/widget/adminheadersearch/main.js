define('modules/widget/adminheadersearch/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('admin-header-search', {
      template: "<form class=\"search-form search-form-header\" role=\"form\" action=\"index.html\">\r\n    <div class=\"input-icon right\">\r\n        <i class=\"icon-magnifier\"></i>\r\n        <input type=\"text\" class=\"form-control input-sm\" name=\"query\" placeholder=\"Search...\">\r\n    </div>\r\n</form>\r\n",
      ready: function ready() {
          _init();
      }
  });
  
  function _init() {
      $(function () {
          handleQuickSearch(); // handles quick search
      });
  }
  
  var handleQuickSearch = function handleQuickSearch() {
  
      // handle search for header search input on enter press
      $('.search-form-header').on('keypress', 'input.form-control', function (e) {
          if (e.which == 13) {
              $('.search-form-header').submit();
              return false;
          }
      });
  
      // handle search for header search input on icon click
      $('.search-form-header').on('click', '.icon-search', function (e) {
          $('.search-form-header').submit();
          return false;
      });
  };

});
