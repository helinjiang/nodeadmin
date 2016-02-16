define('modules/index/test3/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  var Test2 = require('modules/index/test2/main');
  
  module.exports = Vue.extend({
    data: function data() {
      return {
        msg: "hello, i am test3"
      };
    },
    template: "<hr>\r\n<div class=\"test3\">\r\n    <h2>{{ msg }}</h2>\r\n    <test2 msg2=\"do not afaid\"></test2>\r\n    <p>测试组件嵌套组件</p>\r\n</div>\r\n",
    components: {
      'test2': Test2
    }
  });

});
