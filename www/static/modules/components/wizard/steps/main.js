define('modules/components/wizard/steps/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<ul class=\"nav nav-pills nav-justified steps\">\r\n    <template v-for=\"item in items\">\r\n        <li :class=\"$index<index?doneClass:''\">\r\n            <a href=\"{{item.target}}\" data-toggle=\"tab\" class=\"step\">\r\n                <span class=\"number\"> {{$index+1}} </span>\r\n                <span class=\"desc\">\r\n                        <i class=\"fa fa-check\"></i> {{item.title}} \r\n                </span>\r\n            </a>\r\n        </li>\r\n    </template>\r\n</ul>\r\n",
      data: function data() {
          return {
              doneClass: 'done'
          };
      },
      props: {
          /**
           * 当前是第几步，从0开始
           */
          index: Number,
  
          /**
           * 步骤的配置
           */
          items: {
              type: Array,
              required: true
          }
      },
      methods: {
          getLength: function getLength() {
              return this.items.length;
          }
      },
      ready: function ready() {}
  });

});
