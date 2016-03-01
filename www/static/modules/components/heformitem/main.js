define('modules/components/heformitem/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('he-form-item', {
      template: "<div class=\"form-group\" :class=\"{ 'errwrap': !horizontal }\">\r\n    <template v-if=\"horizontal\">\r\n        <label class=\"col-md-{{colLeft}} control-label\">{{ title }} <span class=\"required\" v-if=\"required\"> * </span></label>\r\n        <div class=\"col-md-{{colRight}} errwrap\">\r\n            <slot></slot>\r\n            <span class=\"help-block\" v-if=\"help\" v-text=\"help\"></span>\r\n        </div>\r\n    </template>\r\n    <template v-else>\r\n        <label class=\"control-label\">{{ title }}</label>\r\n        <slot></slot>\r\n        <span class=\"help-block\" v-if=\"help\" v-text=\"help\"></span>\r\n    </template>\r\n</div>",
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
          },
  
          // TODO 如果是required，则还需要将这个属性放入到input中，可以利用h5特有的来校验
          required: Boolean,
  
          help: String
  
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
          $('input, textarea', this.$el).addClass('form-control');
      }
  });

});
