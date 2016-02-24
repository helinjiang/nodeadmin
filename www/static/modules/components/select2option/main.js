define('modules/components/select2option/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('select2-option', {
      template: "<div style=\"display:none\" data-value=\"{{value}}\">{{title}}</div>",
      props: {
          /**
           * 选项名字
           */
          'title': {
              type: String,
              required: true
          },
  
          /**
           * 选项值
           */
          'value': {
              type: String,
              'default': ''
          }
  
      },
      ready: function ready() {}
  });

});
