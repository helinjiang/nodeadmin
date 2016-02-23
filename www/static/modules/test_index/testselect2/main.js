define('modules/test_index/testselect2/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"test-select2\">\r\n\r\n    <select2 value=\"1\">\r\n        <select2-option title=\"hello1\" value=\"1\"></select2-option>\r\n        <select2-option title=\"word2\" value=\"2\"></select2-option>\r\n        <select2-option title=\"test3\" value=\"3\"></select2-option>\r\n    </select2>\r\n\r\n    <select2 :init-data=\"select2data\" value=\"2\">\r\n        <select2-option title=\"test4\" value=\"4\"></select2-option>\r\n    </select2>\r\n\r\n    <select2 url=\"/admin/test/getgroup\" convert=\"getgroup\">\r\n        <select2-option title=\"test4\" value=\"4\"></select2-option>\r\n    </select2>\r\n\r\n    <select2 url=\"/admin/test/getgroup\" lazy>\r\n        <select2-option title=\"test4\" value=\"4\"></select2-option>\r\n    </select2>\r\n\r\n    <select2 url=\"/admin/test/searchuser\" convert=\"searchuser\" ajax></select2> \r\n\r\n</div>\r\n",
      data: function data() {
          return {
              select2data: [{
                  id: 1,
                  text: 'hello'
              }, {
                  id: 2,
                  text: 'world'
              }, {
                  id: 3,
                  text: 'what'
              }]
          };
      },
      ready: function ready() {}
  });

});
