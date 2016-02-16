define('modules/index/test2/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
    data: function data() {
      return {
        msg: "hello, i am test2"
      };
    },
    props: ['msg2'],
    template: "<hr>\r\n<h2>{{ msg }}</h2>\r\n<p v-if=\"msg2\">我想多说一句：{{ msg2 }}</p>\r\n<p>测试props</p>"
  });

});
