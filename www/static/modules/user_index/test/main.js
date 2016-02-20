define('modules/user_index/test/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div v-if=\"debug\">\r\n    <select2 init-value=\"1\">\r\n        <select2-option title=\"hello1\" value=\"1\"></select2-option>\r\n        <select2-option title=\"word2\" value=\"2\"></select2-option>\r\n        <select2-option title=\"test3\" value=\"3\"></select2-option>\r\n    </select2>\r\n    <select2 :init-data=\"select2data\" init-value=\"2\">\r\n        <select2-option title=\"test4\" value=\"4\"></select2-option>\r\n    </select2>\r\n    <select2 url=\"/admin/user/getgroup\" convert=\"getgroup\">\r\n        <select2-option title=\"test4\" value=\"4\"></select2-option>\r\n    </select2>\r\n    <select2 url=\"/admin/user/getgroup\" lazy>\r\n        <select2-option title=\"test4\" value=\"4\"></select2-option>\r\n    </select2>\r\n    <select2 url=\"/admin/user/searchuser\" convert=\"searchuser\" ajax></select2>\r\n</div>\r\n",
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
