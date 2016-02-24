define('modules/user_index/detail/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
  var Names = require('modules/common/names');
  
  module.exports = CommonCrud.extend({
      template: "<div class=\"deletepage\">\r\n    <modal title=\"用户信息详情\">\r\n        <table class=\"table table-bordered\">\r\n            <tr v-for=\"item in items\">\r\n                <th>{{ item.title}}</th>\r\n                <td>{{ item.value}}</td>\r\n            </tr>\r\n        </table>\r\n    </modal>\r\n</div>\r\n",
      data: {
          items: []
      },
      methods: {
          beforeShowModal: function beforeShowModal(data) {
              if (!data) {
                  return;
              }
  
              // 设置要展示的信息条目
              var fields = ['id', 'name', 'birthday', 'stateShow', 'createTime', 'updateTime'],
                  map = Names.user;
  
              this.items = fields.map(function (field) {
                  return {
                      key: field,
                      value: data[field],
                      title: map[field]
                  };
              });
          },
          triggerSubmit: function triggerSubmit() {
              this.hideModal();
          }
      }
  });

});
