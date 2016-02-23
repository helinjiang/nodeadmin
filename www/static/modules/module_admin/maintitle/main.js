define('modules/module_admin/maintitle/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var menuData = require('modules/common/menudata');
  
  Vue.component('admin-main-title', {
      template: "<div class=\"admin-title\">\r\n    <h3 class=\"page-title\">{{ title }} <small>{{ desc }}</small></h3>\r\n\r\n    <div class=\"page-bar\">\r\n        <ul class=\"page-breadcrumb\">\r\n            <li v-for=\"item in items\">\r\n                <i class=\"fa fa-{{item.icon}}\" v-if=\"item.icon\"></i>\r\n                <a href=\"{{item.url}}\">{{item.name}}</a>\r\n                <i class=\"fa fa-angle-right\" v-if=\"!item.last\"></i>                \r\n            </li>\r\n        </ul>\r\n    </div> \r\n</div>\r\n\r\n     ",
      props: {
          'title': {
              type: String,
              required: true
          },
          'desc': String,
  
          /**
           * 面包屑设置，格式为 name|url|icon;name|url|icon
           */
          'items': {
              coerce: function coerce(val) {
                  if (!val) {
                      return [{
                          name: 'Home',
                          url: 'index.html',
                          icon: 'home'
                      }];
                  }
  
                  var itemArr = val.split(';'),
                      length = itemArr.length,
                      result = [];
  
                  for (var i = 0; i < length; i++) {
                      var item = itemArr[i],
                          arr = item.split('|'),
                          obj = {};
  
                      obj.name = arr[0];
                      obj.url = arr[1] || 'javascript:;';
                      obj.icon = arr[2] || '';
  
                      result.push(obj);
                  }
  
                  // 最后一个元素不加>
                  result[length - 1].last = true;
  
                  return result;
              }
          }
      },
      ready: function ready() {}
  });

});
