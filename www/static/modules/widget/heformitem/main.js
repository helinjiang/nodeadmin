define('modules/widget/heformitem/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('he-form-item', {
      template: "<div :class=\"horizontal?'form-group':'form-group errwrap'\">\r\n    <template v-if=\"horizontal\">\r\n        <label class=\"col-md-{{colLeft}} control-label\">{{ title }}</label>\r\n        <div class=\"col-md-{{colRight}} errwrap\">\r\n            <slot></slot>\r\n        </div>\r\n    </template>\r\n    <template v-else>\r\n        <label class=\"control-label\">{{ title }}</label>\r\n        <slot></slot>\r\n    </template>\r\n</div>",
      props: {
          /**
           * 
           */
          'title': String,
  
          'horizontal': {
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
      ready: function ready() {
          $('input', this.$el).addClass('form-control');
      }
  });

});
