define('modules/components/heform/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('he-form', {
      template: "<form :action=\"action\" :class=\"horizontal?'form-horizontal':''\" role=\"form\" :method=\"method\">\r\n    <div class=\"form-body\">\r\n        <slot></slot>\r\n    </div>\r\n    <div class=\"form-actions\" v-if=\"!noactions\">\r\n        <slot name=\"actions\"></slot>\r\n    </div>\r\n</form>\r\n",
      props: {
          /**
           * 
           */
          'action': String,
  
          /**
           * 默认为post请求
           */
          'method': {
              type: String,
              'default': 'post'
          },
  
          'horizontal': {
              type: Boolean,
              'default': false
          },
  
          /**
           * 默认是有actions
           */
          'noactions': {
              type: Boolean,
              'default': false
          },
  
          /**
           * 如果是水平排列的话，则需要定义左右的宽度，格式为x-x，其中x值为1到12
           */
          'col': {
              type: String,
              'default': '3-9'
          }
  
      },
      computed: {
          colLeft: function colLeft() {
              var defaultVal = 3,
                  val;
  
              if (!this.col) {
                  return defaultVal;
              }
  
              val = parseInt(this.col.split('-')[0], 10);
  
              if (isNaN(val) || val < 1 || val > 12) {
                  return defaultVal;
              } else {
                  return val;
              }
          },
          colRight: function colRight() {
              var defaultVal = 9,
                  val;
  
              if (!this.col) {
                  return defaultVal;
              }
  
              val = parseInt(this.col.split('-')[1], 10);
  
              if (isNaN(val) || val < 1 || val > 12) {
                  return defaultVal;
              } else {
                  return val;
              }
          }
      },
      ready: function ready() {}
  });

});
