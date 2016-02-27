define('modules/components/tipalert/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('tip-alert', {
      template: "<div class=\"alert alert-{{type}}\" v-show=\"!hide\">\r\n    <button class=\"close\" v-on:click=\"hideIt\"></button>\r\n    <span>{{msg}}</span>\r\n</div>\r\n",
      props: {
          'type': {
              type: String,
              'default': 'danger' },
          //danger,info,success,warning
          msg: String,
          hide: Boolean
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
  
              this.hide = false;
          },
          hideIt: function hideIt(event) {
              this.hide = true;
  
              // 这里非常重要，因为如果在表单里面，它会触发submit提交，必须要阻止
              // 且由于该方法可能也会被手工调用，因此event不一定存在
              if (event) {
                  event.preventDefault();
              }
          }
      }
  });

});
