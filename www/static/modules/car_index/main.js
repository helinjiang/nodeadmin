define('modules/car_index/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var add = require('modules/car_index/add/main');
  var modify = require('modules/car_index/modify/main');
  var deletePage = require('modules/car_index/delete/main');
  var detail = require('modules/car_index/detail/main');
  
  module.exports = Vue.extend({
      template: "<admin-main-toolbar>\r\n    <add v-on:savesuccess=\"reloadDataGrid\"></add>\r\n    <modify v-ref:modify v-on:savesuccess=\"reloadDataGrid\"></modify>\r\n    <delete v-ref:delete v-on:savesuccess=\"reloadDataGrid\"></delete>\r\n    <detail v-ref:detail></detail>\r\n</admin-main-toolbar>\r\n\r\n<portlet title=\"用户列表\" icon=\"globe\">    \r\n    <datagrid url=\"/admin/car/getdata\" pagelength=\"4\" type=\"server\" v-on:click=\"operate\" v-ref:datagrid>\r\n        <datagrid-item name=\"id\" title=\"ID\"></datagrid-item>\r\n        <datagrid-item name=\"user_name\" title=\"车主人\"></datagrid-item>\r\n        <datagrid-item name=\"name\" title=\"汽车名字\"></datagrid-item>\r\n        <datagrid-item name=\"buydate\" title=\"购买日期\"></datagrid-item>\r\n        <datagrid-item name=\"stateShow\" title=\"状态\"></datagrid-item>\r\n        <datagrid-item name=\"id\" title=\"操作\" render=\"commonOperate | detail modify delete\" disableorder></datagrid-item>\r\n    </datagrid>\r\n</portlet>",
      components: {
          'add': add,
          'modify': modify,
          'delete': deletePage,
          'detail': detail
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
                  case 'delete':
                      showDlgDelete(this, $target);
                      break;
                  case 'detail':
                      showDlgDetail(this, $target);
                      break;
                  default:
                      break;
              }
          },
          reloadDataGrid: function reloadDataGrid() {
              this.$refs.datagrid.reload();
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
  
      // console.log(data);
  
      vm.$refs.modify.showModal(data);
  }
  
  function showDlgDelete(vm, jqTarget) {
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
  
      // console.log(data);
  
      vm.$refs['delete'].showModal(data);
  }
  
  function showDlgDetail(vm, jqTarget) {
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
  
      // console.log(data);
  
      vm.$refs.detail.showModal(data);
  }

});
