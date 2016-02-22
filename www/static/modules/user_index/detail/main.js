define('modules/user_index/detail/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var validator = require('modules/common/validator');
  var Msg = require('modules/widget/msg/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"deletepage\">\r\n    <modal title=\"用户信息详情\" v-on:confirm=\"hideModal\">\r\n        <table class=\"table table-bordered\">\r\n            <tr v-for=\"item in items\">\r\n                <th>{{ item.title}}</th>\r\n                <td>{{ item.value}}</td>\r\n            </tr>\r\n        </table>\r\n    </modal>\r\n</div>\r\n",
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
          }
      },
      ready: function ready() {}
  });

});
