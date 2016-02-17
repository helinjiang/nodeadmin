define('modules/widget/datagriditem/main', function(require, exports, module) {

  /**
   * 
   */
  
  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('datagrid-item', {
      template: "<div style=\"display:none\" data-name=\"{{name}}\" data-title=\"{{title}}\"></div>",
      props: {
          /**
           * 数据的字段名
           */
          'name': {
              type: String,
              required: true
          },
          'title': String
      },
      ready: function ready() {}
  });

});
