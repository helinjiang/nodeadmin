define('modules/user_index/main/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var add = require('modules/test/add/main');
  
  module.exports = Vue.extend({
      template: "<admin-main-toolbar>\r\n    <add></add>\r\n</admin-main-toolbar>\r\n\r\n<portlet title=\"datagrid\" icon=\"globe\">    \r\n    <datagrid type=\"server\" url=\"https://www.datatables.net/examples/server_side/scripts/post.php\"></datagrid>\r\n</portlet>",
      components: {
          'add': add
      },
      ready: function ready() {}
  });

});
