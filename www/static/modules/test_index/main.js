define('modules/test_index/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var TestSelect2 = require('modules/test_index/testselect2/main');
  var TestDate = require('modules/test_index/testdate/main');
  var testWizard = require('modules/test_index/testwizard/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"test_index-main\">\r\n\r\n    <div class=\"row\">\r\n\r\n        <!-- <div class=\"col-md-6\">\r\n            <test-select2></test-select2>\r\n        </div>   \r\n        \r\n        <div class=\"col-md-6\">\r\n             <test-date></test-date>  \r\n        </div>   -->\r\n\r\n        <test-wizard></test-wizard>\r\n\r\n    </div>  \r\n    \r\n</div>",
      components: {
          TestSelect2: TestSelect2,
          TestDate: TestDate,
          testWizard: testWizard
      },
      ready: function ready() {}
  });

});
