define('modules/user_index/delete/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var validator = require('modules/common/validator');
  var Msg = require('modules/components/msg/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"deletepage\">\r\n    <modal title=\"删除用户信息\" v-on:confirm=\"saveSubmit\">\r\n        <div class=\"alert alert-warning alert-dismissable\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\"></button>\r\n            <strong>Warning!</strong> 请确定是否删除，一旦删除，数据将无法恢复！\r\n        </div>\r\n        <table class=\"table table-bordered\">\r\n            <tr>\r\n                <th>ID</th>\r\n                <td>{{id}}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>用户名</th>\r\n                <td>{{name}}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>状态</th>\r\n                <td>{{stateShow}}</td>\r\n            </tr>\r\n        </table>\r\n    </modal>\r\n</div>\r\n",
      data: function data() {
          return {
              id: undefined,
              name: undefined,
              stateShow: undefined
          };
      },
      methods: {
          showModal: function showModal(data) {
              this.id = data.id;
              this.name = data.name;
              this.stateShow = data.stateShow;
  
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
