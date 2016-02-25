define('modules/car_index/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var addPage = require('modules/car_index/add/main');
  var modifyPage = require('modules/car_index/modify/main');
  var deletePage = require('modules/car_index/delete/main');
  var detailPage = require('modules/car_index/detail/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"user_index-main\">\r\n\r\n    <admin-main-toolbar>\r\n        <add v-on:savesuccess=\"reloadDataGrid\"></add>\r\n        <modify v-ref:modify v-on:savesuccess=\"reloadDataGrid\"></modify>\r\n        <delete v-ref:delete v-on:savesuccess=\"reloadDataGrid\"></delete>\r\n        <detail v-ref:detail></detail>\r\n    </admin-main-toolbar>\r\n\r\n    <portlet title=\"用户列表\" icon=\"globe\">    \r\n        <datagrid url=\"/admin/car/getdata\" pagelength=\"4\" type=\"server\" v-on:click=\"operate\" v-ref:datagrid>\r\n            <datagrid-item name=\"id\" title=\"ID\"></datagrid-item>\r\n            <datagrid-item name=\"user_name\" title=\"车主人\"></datagrid-item>\r\n            <datagrid-item name=\"name\" title=\"汽车名字\"></datagrid-item>\r\n            <datagrid-item name=\"buydate\" title=\"购买日期\"></datagrid-item>\r\n            <datagrid-item name=\"stateShow\" title=\"状态\"></datagrid-item>\r\n            <datagrid-item name=\"id\" title=\"操作\" render=\"commonOperate | detail modify delete\" disableorder></datagrid-item>\r\n        </datagrid>\r\n    </portlet>   \r\n\r\n</div>\r\n",
      components: {
          'add': addPage,
          'modify': modifyPage,
          'delete': deletePage,
          'detail': detailPage
      },
      methods: {
          operate: function operate(event) {
              var target = event.target,
                  $target = $(target),
                  type = $target.data('type'),
                  id,
                  data;
  
              if (!type || ['modify', 'delete', 'detail'].indexOf(type) < 0) {
                  return;
              }
  
              id = $target.data('id');
  
              data = this.getDataById(id);
  
              if (data) {
                  this.$refs[type].showModal(data);
              }
          },
          reloadDataGrid: function reloadDataGrid() {
              this.$refs.datagrid.reload();
          },
          getDataById: function getDataById(id) {
              if (!id) {
                  console.error('No ID!');
                  return;
              }
  
              var data = this.$refs.datagrid.getDataById('id', id);
  
              if (!data) {
                  console.error('No data of id=' + id);
                  return;
              }
  
              return data;
          }
      },
      ready: function ready() {}
  });

});
