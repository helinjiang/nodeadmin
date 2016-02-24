define('modules/user_index/delete/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var validator = require('modules/common/validator');
  var Msg = require('modules/components/msg/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"deletepage\">\r\n    <modal title=\"删除用户信息\" v-on:confirm=\"saveSubmit\">\r\n        <div class=\"alert alert-warning alert-dismissable\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\"></button>\r\n            <strong>Warning!</strong> 请确定是否删除，一旦删除，数据将无法恢复！\r\n        </div>\r\n        <table class=\"table table-bordered\">\r\n            <tr v-for=\"item in items\">\r\n                <th>{{ item.title}}</th>\r\n                <td>{{ item.value}}</td>\r\n            </tr>\r\n        </table>\r\n    </modal>\r\n</div>\r\n",
      data: function data() {
          return {
              items: []
          };
      },
      methods: {
          showModal: function showModal(data) {
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
  
              this.$children[0].show();
          },
          hideModal: function hideModal() {
              this.$children[0].hide();
          },
          reportSuccess: function reportSuccess(data) {
              this.$dispatch('savesuccess', data);
          },
          saveSubmit: function saveSubmit(msg) {
              var self = this;
  
              $.post('/admin/user/delete', {
                  id: this.id
              }, function (responseText, statusText) {
                  console.log(responseText, statusText);
                  if (statusText !== 'success' || responseText.errno !== 0) {
                      // 提示失败
                      Msg.error('删除' + self.name + '(' + self.id + ')出错！' + JSON.stringify(responseText));
                  } else {
                      // 提示成功
                      Msg.success('删除' + JSON.stringify(responseText.data) + '成功！');
  
                      // 关闭对话框
                      self.hideModal();
  
                      // 刷新列表
                      self.reportSuccess(responseText.data);
                  }
              });
          }
      },
      ready: function ready() {}
  });

});
