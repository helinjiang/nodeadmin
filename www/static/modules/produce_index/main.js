define('modules/produce_index/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var ProduceWizard = require('modules/produce_index/wizard/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"produce_index-main\">\r\n\r\n    <div class=\"row\">\r\n\r\n        <div class=\"col-md-12\">\r\n\r\n            <produce-wizard></produce-wizard>\r\n            \r\n        </div>\r\n\r\n    </div>  \r\n    \r\n</div>",
      components: {
          ProduceWizard: ProduceWizard
      },
      ready: function ready() {}
  });

});
