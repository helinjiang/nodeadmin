define('modules/codingitem_index/add/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var savePage = require('modules/codingitem_index/save/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"addpage\">   \r\n   <save-page title=\"新增代码生成器字段信息\" :coding-id=\"assign.id\" ></save-page>\r\n</div>\r\n",
      components: {
          savePage: savePage
      },
      props: {
          assign: {
              required: true,
              type: Object
          }
      },
      ready: function ready() {}
  });

});
