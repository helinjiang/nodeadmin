define('modules/test_index/testdate/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"test-date\">\r\n\r\n    <date name=\"birthday\" value=\"2015-12-12\"></date>\r\n\r\n    <date name=\"birthday2\" value=\"2016-12-12\" start-date=\"+0d\"></date>\r\n\r\n    <date name=\"birthday3\" value=\"2015-12-12\" start-date=\"2015-12-10\"></date>\r\n    \r\n    <date name=\"birthday4\" today-btn=\"linked\"></date>\r\n\r\n</div>\r\n",
      ready: function ready() {}
  });

});
