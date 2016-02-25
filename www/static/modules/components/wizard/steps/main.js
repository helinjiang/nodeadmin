define('modules/components/wizard/steps/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<ul class=\"nav nav-pills nav-justified steps\">\r\n    <li>\r\n        <a href=\"#tab1\" data-toggle=\"tab\" class=\"step\">\r\n            <span class=\"number\"> 1 </span>\r\n            <span class=\"desc\">\r\n                        <i class=\"fa fa-check\"></i> Account Setup \r\n            </span>\r\n        </a>\r\n    </li>\r\n    <li>\r\n        <a href=\"#tab2\" data-toggle=\"tab\" class=\"step\">\r\n            <span class=\"number\">\r\n                            2 </span>\r\n            <span class=\"desc\">\r\n                            <i class=\"fa fa-check\"></i> Profile Setup </span>\r\n        </a>\r\n    </li>\r\n    <li>\r\n        <a href=\"#tab3\" data-toggle=\"tab\" class=\"step active\">\r\n            <span class=\"number\">\r\n                            3 </span>\r\n            <span class=\"desc\">\r\n                            <i class=\"fa fa-check\"></i> Billing Setup </span>\r\n        </a>\r\n    </li>\r\n    <li>\r\n        <a href=\"#tab4\" data-toggle=\"tab\" class=\"step\">\r\n            <span class=\"number\">\r\n                            4 </span>\r\n            <span class=\"desc\">\r\n                            <i class=\"fa fa-check\"></i> Confirm </span>\r\n        </a>\r\n    </li>\r\n</ul>\r\n",
      ready: function ready() {}
  });

});
