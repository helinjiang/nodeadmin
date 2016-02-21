define('modules/user_index/justtest/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div v-if=\"debug\">\r\n<!--     <select2 value=\"1\">\r\n        <select2-option title=\"hello1\" value=\"1\"></select2-option>\r\n        <select2-option title=\"word2\" value=\"2\"></select2-option>\r\n        <select2-option title=\"test3\" value=\"3\"></select2-option>\r\n    </select2>\r\n    <select2 :init-data=\"select2data\" value=\"2\">\r\n        <select2-option title=\"test4\" value=\"4\"></select2-option>\r\n    </select2>\r\n    <select2 url=\"/admin/user/getgroup\" convert=\"getgroup\">\r\n        <select2-option title=\"test4\" value=\"4\"></select2-option>\r\n    </select2>\r\n    <select2 url=\"/admin/user/getgroup\" lazy>\r\n        <select2-option title=\"test4\" value=\"4\"></select2-option>\r\n    </select2>\r\n    <select2 url=\"/admin/user/searchuser\" convert=\"searchuser\" ajax></select2> -->\r\n\r\n    <date name=\"birthday\" value=\"2015-12-12\"></date>\r\n    <date name=\"birthday2\" value=\"2016-12-12\" start-date=\"+0d\"></date>\r\n    <date name=\"birthday3\" value=\"2015-12-12\" start-date=\"2015-12-10\"></date>\r\n    <date name=\"birthday4\" today-btn=\"linked\"></date>\r\n\r\n</div>\r\n",
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
      props: {
          debug: {
              type: Boolean
          }
      },
      ready: function ready() {}
  });

});
