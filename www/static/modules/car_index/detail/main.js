define('modules/car_index/detail/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var validator = require('modules/common/validator');
  var Msg = require('modules/components/msg/main');
  
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
  
              this.$children[0].show();
          },
          hideModal: function hideModal() {
              this.$children[0].hide();
          }
      },
      ready: function ready() {}
  });

});
