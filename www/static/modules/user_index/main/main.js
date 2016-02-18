define('modules/user_index/main/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var add = require('modules/test/add/main');
  
  module.exports = Vue.extend({
      template: "<admin-main-toolbar>\r\n    <add></add>\r\n</admin-main-toolbar>\r\n\r\n<portlet title=\"用户列表\" icon=\"globe\">    \r\n    <datagrid url=\"/admin/user/getdata\" v-on:click=\"operate\">\r\n        <datagrid-item name=\"id\" title=\"ID\"></datagrid-item>\r\n        <datagrid-item name=\"name\" title=\"用户名\"></datagrid-item>\r\n        <datagrid-item name=\"pwd\" hide></datagrid-item>\r\n        <datagrid-item name=\"id\" title=\"操作\" render=\"commonOperate | detail modify delete\" disableorder></datagrid-item>\r\n    </datagrid>\r\n</portlet>\r\n",
      components: {
          'add': add
      },
      methods: {
          operate: function operate(event) {
              console.log('operate', event.target);
          }
      },
      ready: function ready() {}
  });

});
