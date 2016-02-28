define('modules/components/wizard/progress/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"progress progress-striped\" role=\"progressbar\">\r\n    <div class=\"progress-bar progress-bar-success\" :style=\"{width:width}\"></div>\r\n</div>\r\n",
      props: {
          index: Number,
          total: Number
      },
      computed: {
          /**
           * 进度条宽度
           */
          width: function width() {
              return (this.index + 1) / this.total * 100 + '%';
          }
      },
      ready: function ready() {}
  });

});
