define('modules/components/wizard/actions/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"form-actions fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"col-md-offset-3 col-md-9\">\r\n                <a href=\"javascript:;\" class=\"btn btn-default button-previous\">\r\n                    <i class=\"m-icon-swapleft\"></i> 后退 \r\n                </a>\r\n                <a href=\"javascript:;\" class=\"btn btn-info button-next\">\r\n                    继续 <i class=\"m-icon-swapright m-icon-white\"></i>\r\n                </a>\r\n                <a href=\"javascript:;\" class=\"btn btn-success button-submit\">\r\n                    提交 <i class=\"m-icon-swapright m-icon-white\"></i>\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>",
      ready: function ready() {}
  });

});
