define('modules/components/linkitem/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('link-item', {
      template: "<a href=\"{{href}}\">\r\n    <i class=\"{{iconClass}}\" v-if=\"iconClass\"></i> \r\n    <span><slot></slot></span> \r\n    <span class=\"badge badge-{{btype}}\" v-if=\"bname\"> {{bname}} </span> \r\n    <i class=\"{{iconEndClass}}\" v-if=\"iconEndClass\"></i>     \r\n</a>",
      props: {
          /**
           * 链接地址
           */
          'href': {
              type: String,
              'default': '#'
          },
  
          /**
           * icon名字
           */
          'icon': String,
  
          /**
           * 一共有三种图标，分别是fa\icon\glyphicons
           */
          'icontype': {
              type: String,
              'default': 'fa'
          },
  
          /**
           * 尾部icon名字
           */
          'iconend': String,
  
          /**
           * 一共有三种图标，分别是fa\icon\glyphicons
           */
          'iconendtype': {
              type: String,
              'default': 'fa'
          },
  
          /**
           * badge name
           */
          'bname': String,
  
          /**
           * badge type
           * Default Primary Info Success Danger Warning
           */
          'btype': {
              type: String,
              'default': 'default'
          }
      },
      computed: {
          iconClass: function iconClass() {
              return this._getIconClass(this.icon, this.icontype);
          },
          iconEndClass: function iconEndClass() {
              return this._getIconClass(this.iconend, this.iconendtype);
          }
      },
      methods: {
          _getIconClass: function _getIconClass(icon, icontype) {
              if (!icon) {
                  return false;
              }
  
              var result;
  
              switch (icontype) {
                  case 'icon':
                      result = 'icon-' + icon;
                      break;
                  case 'glyph':
                      result = 'glyphicon glyphicon-' + icon;
                      break;
                  case 'fa':
                      result = 'fa fa-' + icon;
                      break;
                  default:
                      result = icon;
                      break;
              }
  
              return result;
          }
      },
      ready: function ready() {}
  });

});
