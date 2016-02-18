define('modules/user_index/main/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var add = require('modules/user_index/add/main');
  var modify = require('modules/user_index/modify/main');
  
  module.exports = Vue.extend({
      template: "<admin-main-toolbar>\r\n    <add></add>\r\n    <modify v-ref:modify></modify>\r\n</admin-main-toolbar>\r\n\r\n<portlet title=\"用户列表\" icon=\"globe\">    \r\n    <datagrid url=\"/admin/user/getdata\" v-on:click=\"operate\" v-ref:datagrid>\r\n        <datagrid-item name=\"id\" title=\"ID\"></datagrid-item>\r\n        <datagrid-item name=\"name\" title=\"用户名\" css=\"namecss\"></datagrid-item>\r\n        <datagrid-item name=\"pwd\" hide></datagrid-item>\r\n        <datagrid-item name=\"id\" title=\"操作\" render=\"commonOperate | detail modify delete\" disableorder></datagrid-item>\r\n    </datagrid>\r\n</portlet>\r\n",
      components: {
          'add': add,
          'modify': modify
      },
      methods: {
          operate: function operate(event) {
              console.log('operate', event.target);
              var target = event.target,
                  $target = $(target),
                  type = $target.data('type');
  
              if (!type) {
                  return;
              }
  
              switch (type) {
                  case 'modify':
                      showDlgModify(this, $target);
                      break;
                  default:
                      break;
              }
          }
      },
      ready: function ready() {}
  });
  
  function showDlgModify(vm, jqTarget) {
      var id = jqTarget.data('id'),
          data;
  
      if (!id) {
          console.error('No ID!');
          return;
      }
  
      data = vm.$refs.datagrid.getDataById('id', id);
      if (!data) {
          console.error('No data of id=' + id);
          return;
      }
  
      console.log(data);
  
      vm.$refs.modify.showModal({
          id: data.id,
          name: data.name
      });
  }

});
