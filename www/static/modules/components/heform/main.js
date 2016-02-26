define('modules/components/heform/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('he-form', {
      template: "<form :id=\"id\" :action=\"action\" :class=\"{ 'form-horizontal': horizontal }\" role=\"form\" :method=\"method\">\r\n    <template v-if=\"inner\">\r\n        <div :class=\"inner\">\r\n            <div class=\"form-body\" :class=\"bodycss\">\r\n                <slot></slot>\r\n            </div>\r\n            <div class=\"form-actions\" :class=\"actionscss\" v-if=\"!noactions\">\r\n                <slot name=\"actions\"></slot>\r\n            </div>\r\n        </div>\r\n    </template>\r\n    <template v-else>\r\n        <div class=\"form-body\" :class=\"bodycss\">\r\n            <slot></slot>\r\n        </div>\r\n        <div class=\"form-actions\" :class=\"actionscss\" v-if=\"!noactions\">\r\n            <slot name=\"actions\"></slot>\r\n        </div>\r\n    </template>\r\n</form>\r\n",
      props: {
          id: String,
          /**
           * 
           */
          'action': {
              type: String,
              'default': '#'
          },
  
          /**
           * 默认为post请求
           */
          'method': {
              type: String,
              'default': 'post'
          },
  
          'horizontal': Boolean,
  
          /**
           * 默认是有actions
           */
          'noactions': Boolean,
  
          /**
           * 如果是水平排列的话，则需要定义左右的宽度，格式为x-x，其中x值为1到12
           */
          'col': {
              type: String,
              'default': '3-9'
          },
  
          /**
           * form中的内容再包裹一层div，此处为inner的css样式
           */
          'inner': String,
  
          // body 附加的css
          'bodycss': String,
  
          // actions 附加的css
          'actionscss': String
  
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
