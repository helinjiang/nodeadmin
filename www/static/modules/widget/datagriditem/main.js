define('modules/widget/datagriditem/main', function(require, exports, module) {

  /**
   * 
   */
  
  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('datagrid-item', {
      template: "<div style=\"display:none\" data-name=\"{{name}}\" data-title=\"{{title}}\" data-disableorder=\"{{disableorder}}\" data-hide=\"{{hide}}\"></div>",
      props: {
          /**
           * 数据的字段名
           */
          'name': {
              type: String,
              required: true
          },
          'title': String,
          /**
           * 渲染方法名，方法在/common/render.js中定义
           */
          'render': String,
  
          /**
           * 使该列不能够排序
           */
          'disableorder': {
              type: Boolean,
              'default': false
          },
  
          /**
           * 使该列不显示
           */
          'hide': {
              type: Boolean,
              'default': false
          }
      },
      ready: function ready() {}
  });

});
