define('modules/widget/datagriditem/main', function(require, exports, module) {

  /**
   * 
   */
  
  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('datagrid-item', {
    template: "<div style=\"display:none\" data-name=\"{{name}}\" data-title=\"{{title}}\" data-disableorder=\"{{disableorder}}\" data-hide=\"{{hide}}\" data-css=\"{{css}}\"></div>",
    props: {
      /**
       * 该列数据的字段名
       */
      'name': {
        type: String,
        required: true
      },
  
      /**
       * 该列在表格中的展示说明，如果为空则取值 name 值
       */
      'title': String,
  
      /**
       * 为该列增加的样式类className
       */
      'css': String,
  
      /**
       * 该列渲染方法名，方法在/common/render.js中定义
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
