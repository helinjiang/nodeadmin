define('modules/components/wizard/actions/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"col-md-offset-3 col-md-9\">\r\n            <a href=\"javascript:;\" class=\"btn btn-default \" v-on:click=\"triggerCancel\">\r\n                <i class=\"m-icon-swapleft\"></i> 取消 \r\n            </a>\r\n            <a href=\"javascript:;\" class=\"btn btn-default button-previous\" v-show=\"index > 0\">\r\n                <i class=\"m-icon-swapleft\"></i> 后退 \r\n            </a>\r\n            <a href=\"javascript:;\" class=\"btn btn-info button-next\"  v-show=\"index < total-1\">\r\n                继续 <i class=\"m-icon-swapright m-icon-white\"></i>\r\n            </a>\r\n            <a href=\"javascript:;\" class=\"btn btn-success button-submit\" v-on:click=\"triggerSubmit\" v-else>\r\n                提交 <i class=\"m-icon-swapright m-icon-white\"></i>\r\n            </a>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
      props: {
          index: Number,
          total: Number
      },
      methods: {
          triggerCancel: function triggerCancel() {
              alert('canceled!');
              this.$dispatch('wizardcancel');
          },
          triggerSubmit: function triggerSubmit() {
              alert('Finished! Hope you like it :) 111');
          }
      },
      ready: function ready() {}
  });

});
