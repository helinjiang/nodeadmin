define('modules/car_index/detail/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  var Names = require('modules/common/names');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"deletepage\">\r\n    <modal title=\"汽车信息详情\">\r\n        <table class=\"table table-bordered\">\r\n            <tr v-for=\"item in items\">\r\n                <th>{{ item.title}}</th>\r\n                <td>{{ item.value}}</td>\r\n            </tr>\r\n        </table>\r\n    </modal>\r\n</div>\r\n",
      data: {
          items: []
      },
      methods: {
          beforeShowModal: function beforeShowModal(data) {
              if (!data) {
                  return;
              }
  
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
              this.hideModal();
          }
      }
  });

});
