define('modules/module_admin/footer/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  var App = require('modules/common/app');
  
  Vue.component('admin-footer', {
      template: "<div class=\"footer\">\r\n\r\n    <div class=\"footer-inner\">\r\n         {{year}} &copy; Hello, world!\r\n    </div>\r\n\r\n    <div class=\"footer-tools\">\r\n        <span class=\"go-top\" v-on:click=\"goTop\">\r\n            <i class=\"fa fa-angle-up\"></i>\r\n        </span>\r\n    </div>\r\n\r\n</div>",
      data: function data() {
          return {
              year: ''
          };
      },
      methods: {
          goTop: function goTop(event) {
              App.scrollTo();
  
              // 如果该方法可能被手工调用，则event不一定存在
              if (event) {
                  event.preventDefault();
              }
          }
      },
      ready: function ready() {
          this.year = new Date().getFullYear();
      }
  });

});
