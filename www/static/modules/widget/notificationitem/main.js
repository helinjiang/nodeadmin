define('modules/widget/notificationitem/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('notification-item', {
      template: "<li>\r\n    <a href=\"{{href}}\">\r\n        <span class=\"label label-sm label-icon label-{{type}}\"><i class=\"fa fa-{{icon}}\"></i></span> \r\n        <slot></slot><span class=\"time\"> {{time}} </span>\r\n    </a>\r\n</li>\r\n",
      props: {
          'href': {
              type: String,
              'default': '#'
          },
          'type': {
              type: String,
              'default': 'default'
          },
          'icon': {
              type: String,
              'default': 'plus'
          },
          'time': {
              type: String,
              'default': ''
          }
      },
      ready: function ready() {}
  });

});
