define('modules/index/test1/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
    data: function data() {
      return {
        msg: "hello, i am test1"
      };
    },
    template: "<hr>\r\n<h2>{{ msg }}</h2>\r\n<p>简单页面</p>"
  });

});
