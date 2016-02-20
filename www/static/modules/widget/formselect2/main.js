define('modules/widget/formselect2/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('form-select2', {
      template: "<div class=\"form-group\" v-if=\"horizontal\">\r\n    <label class=\"col-md-{{colLeft}} control-label\">{{ title }}</label>\r\n    <div class=\"col-md-{{colRight}} errwrap\">\r\n        <select2 value=\"1\">\r\n            <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n            <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n        </select2>\r\n    </div>\r\n</div>\r\n<div class=\"form-group errwrap\" v-else>\r\n    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->\r\n    <label class=\"control-label visible-ie8 visible-ie9\">{{ title }}</label>\r\n    <div class=\"input-icon\">\r\n        <i class=\"fa fa-{{ icon }}\" v-if=\"icon\"></i>\r\n        <input name=\"{{ name }}\" type=\"{{ type }}\" class=\"form-control placeholder-no-fix\" autocomplete=\"{{autocomplete}}\" placeholder=\"{{ title }}\" readonly=\"{{readonly}}\" />\r\n    </div>\r\n</div>\r\n",
      props: {
          /**
           * 
           */
          'id': String,
  
          /**
           * text/password
           */
          'type': {
              type: String,
              'default': 'text'
          },
  
          /**
           *是否使用icon，非必须，在输入框前面显示图标，会自动生成类似<i class="fa fa-user"></i>，其中的icon就是user
           * user: 用户名
           */
          'icon': String,
  
          /**
           * 字段的解释，非必须，会自动生成类似<label class="control-label">用户名</label>
           */
          'title': String,
  
          /**
           * input 的name 值，必须
           */
          'name': {
              type: String,
              required: true
          },
  
          /**
           * input 的 value 值，不限定什么类型
           */
          'value': 'null',
  
          'readonly': {
              type: Boolean,
              'default': false
          },
  
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
      ready: function ready() {}
  });

});
