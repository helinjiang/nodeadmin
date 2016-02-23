define('modules/module_admin/sidemenuitem/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('admin-side-menu-item', {
      template: "<li :class=\"licss\">\r\n    <a href=\"{{model.url}}\">\r\n        <i class=\"icon-{{model.icon}}\" v-if=\"model.icon\"></i>\r\n        <span class=\"title\">{{model.name}}</span>\r\n        <span class=\"badge badge-{{typeof model.badge=='object'?(model.badge.type||'info'):'info'}}\" v-if=\"model.badge\">{{typeof model.badge=='object'?model.badge.value:model.badge}}</span>\r\n        <span class=\"arrow \" v-if=\"isFolder\"></span>\r\n    </a>\r\n    <ul class=\"sub-menu\" v-if=\"isFolder\">\r\n        <admin-side-menu-item v-for=\"submenu in model.children\" :model=\"submenu\"> </admin-side-menu-item>\r\n    </ul>\r\n</li>\r\n",
      props: {
          model: Object,
          mindex: Number,
          mtotal: Number
      },
      computed: {
          isFolder: function isFolder() {
              return this.model.children && this.model.children.length;
          },
          licss: function licss() {
              var arr = [];
              if (typeof this.mindex !== 'number' || typeof this.mtotal !== 'number') {
                  arr.push('');
              } else if (this.mindex == 0) {
                  arr.push('start');
              } else if (this.mindex + 1 >= this.mtotal) {
                  arr.push('last');
              } else {
                  arr.push('');
              }
  
              if (this.model.active) {
                  arr.push('active');
              }
  
              return arr.join(' ');
          }
      }
  });

});
