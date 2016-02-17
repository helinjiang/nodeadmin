define('modules/widget/tipalert/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('tip-alert', {
      template: "<div class=\"alert alert-{{type}}\" v-show=\"isShow\">\r\n    <button class=\"close\" v-on:click=\"hide\"></button>\r\n    <span>{{msg}}</span>\r\n</div>\r\n",
      data: function data() {
          return {
              isShow: false,
              type: 'danger', //danger,info,success,warning
              msg: '' //必填
          };
      },
      methods: {
          show: function show(msg, type) {
              // msg 字段必填
              if (typeof msg !== "string" || !msg.length) {
                  return;
              }
              this.msg = msg;
  
              // type 默认为 danger
              if (type) {
                  this.type = type;
              }
  
              this.isShow = true;
          },
          hide: function hide(event) {
              this.isShow = false;
  
              // 这里非常重要，因为如果在表单里面，它会触发submit提交，必须要阻止
              // 且由于该方法可能也会被手工调用，因此event不一定存在
              if (event) {
                  event.preventDefault();
              }
          }
      }
  });

});
