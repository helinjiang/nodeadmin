define('modules/user_index/detail/main', function(require, exports, module) {

  'use strict';
  
  var CommonCrud = require('modules/common/crud');
  
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
              this.items = [{
                  key: 'id',
                  value: data.id,
                  title: 'ID'
              }, {
                  key: 'name',
                  value: data.name,
                  title: '用户名'
              }, {
                  key: 'birthday',
                  value: data.birthday,
                  title: '生日'
              }, {
                  key: 'stateShow',
                  value: data.stateShow,
                  title: '状态'
              }, {
                  key: 'createTime',
                  value: data.createTime,
                  title: '创建时间'
              }, {
                  key: 'updateTime',
                  value: data.updateTime,
                  title: '最后修改时间'
              }];
          },
          triggerSubmit: function triggerSubmit() {
              this.hideModal();
          }
      }
  });

});
