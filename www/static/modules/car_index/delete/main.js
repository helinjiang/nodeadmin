define('modules/car_index/delete/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"deletepage\">\r\n    <modal title=\"删除汽车信息\">\r\n        <div class=\"alert alert-warning alert-dismissable\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\"></button>\r\n            <strong>Warning!</strong> 请确定是否删除，一旦删除，数据将无法恢复！\r\n        </div>\r\n        <table class=\"table table-bordered\">\r\n            <tr v-for=\"item in items\">\r\n                <th>{{ item.title}}</th>\r\n                <td>{{ item.value}}</td>\r\n            </tr>\r\n        </table>\r\n    </modal>\r\n</div>\r\n",
      data: {
          id: undefined,
          items: []
      },
      methods: {
          beforeShowModal: function beforeShowModal(data) {
              if (!data || !data.id) {
                  return;
              }
  
              // 设置要删除的记录的id
              this.id = data.id;
  
              // 设置要展示的信息条目
              this.items = [{
                  key: 'id',
                  value: data.id,
                  title: 'ID'
              }, {
                  key: 'user_name',
                  value: data.user_name,
                  title: '车主人'
              }, {
                  key: 'name',
                  value: data.name,
                  title: '汽车名字'
              }, {
                  key: 'buydate',
                  value: data.buydate,
                  title: '购买日期'
              }, {
                  key: 'stateShow',
                  value: data.stateShow,
                  title: '状态'
              }];
          },
          triggerSubmit: function triggerSubmit() {
              var self = this;
  
              $.post('/admin/car/delete', {
                  id: this.id
              }, function (responseText, statusText) {
                  self.dealSuccessRes(responseText, statusText);
              });
          }
      }
  });

});
