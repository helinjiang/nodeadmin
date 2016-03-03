define('modules/codingitem_index/codinginfo/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"row\">\r\n    <div class=\"col-md-12\">{{assign.tableName}}-{{assign.targetName}}({{assign.id}})</div>\r\n</div>",
      props: {
          'assign': {
              type: Object,
              required: true
          }
      },
      ready: function ready() {}
  });

});
