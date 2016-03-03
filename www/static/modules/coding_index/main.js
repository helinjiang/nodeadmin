define('modules/coding_index/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var addPage = require('modules/coding_index/add/main');
  var modifyPage = require('modules/coding_index/modify/main');
  var deletePage = require('modules/coding_index/delete/main');
  var detailPage = require('modules/coding_index/detail/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"coding_index-main\">\r\n\r\n    <admin-main-toolbar>\r\n        <add v-on:savesuccess=\"reloadDataGrid\"></add>\r\n        <modify v-ref:modify v-on:savesuccess=\"reloadDataGrid\"></modify>\r\n        <delete v-ref:delete v-on:savesuccess=\"reloadDataGrid\"></delete>\r\n        <detail v-ref:detail></detail>\r\n    </admin-main-toolbar>\r\n\r\n    <portlet title=\"代码生成器列表\" icon=\"globe\">    \r\n        <datagrid url=\"/admin/coding/getdata\" pagelength=\"4\" v-on:click=\"operate\" v-ref:datagrid>\r\n            <datagrid-item name=\"id\" title=\"ID\"></datagrid-item>\r\n            <datagrid-item name=\"tableName\" title=\"数据库表名\"></datagrid-item>\r\n            <datagrid-item name=\"targetName\" title=\"目标名字\"></datagrid-item>\r\n            <datagrid-item name=\"targetDesc\" title=\"目标描述\"></datagrid-item>\r\n            <datagrid-item name=\"menuId\" title=\"菜单ID\"></datagrid-item>\r\n            <datagrid-item name=\"breadcrumb\" title=\"面包屑导航\"></datagrid-item>\r\n            <datagrid-item name=\"stateShow\" title=\"状态\"></datagrid-item>\r\n            <datagrid-item name=\"id\" title=\"操作\" render=\"commonOperate | detail modify delete\" disableorder></datagrid-item>\r\n        </datagrid>\r\n    </portlet>   \r\n\r\n</div>\r\n",
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
