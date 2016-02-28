define('modules/produce_index/wizard/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"test-wizard\">\r\n\r\n    <wizard :title=\"title\" :step-items=\"stepItems\" :rules-options=\"rulesOptions\">\r\n        \r\n        <wizard-item css=\"active\" id=\"tab1\" title=\"Provide your account details\">\r\n            <he-form-item title=\"用户名\" col=\"3-4\" help=\"Provide your username\" required horizontal>\r\n                <input type=\"text\" name=\"username\" v-model=\"username\">\r\n            </he-form-item>\r\n        </wizard-item>\r\n\r\n        <wizard-item id=\"tab2\" title=\"Provide your profile details\">           \r\n            <he-form-item title=\"Fullname\" col=\"3-4\" help=\"Provide your fullname\" required horizontal>\r\n                <input type=\"text\" name=\"fullname\" v-model=\"fullname\">\r\n            </he-form-item> \r\n\r\n            <he-form-item title=\"Remarks\" col=\"3-4\" help=\"Provide your fullname\"  horizontal>\r\n                <textarea rows=\"3\" name=\"remarks\"  v-model=\"remarks\"></textarea>\r\n            </he-form-item>\r\n        </wizard-item>\r\n\r\n        <wizard-item id=\"tab3\" title=\"Provide your billing and credit card details\">\r\n            <he-form-item title=\"Card Holder Name\" col=\"3-4\" required horizontal>\r\n                <input type=\"text\" name=\"card_name\" v-model=\"card_name\">\r\n            </he-form-item> \r\n        </wizard-item>\r\n\r\n        <wizard-item id=\"tab4\" title=\"Confirm your account\">\r\n\r\n            <h4 class=\"form-section\">Account</h4>\r\n            <he-form-item title=\"Username:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{username}} </p>\r\n            </he-form-item>     \r\n\r\n            <h4 class=\"form-section\">Profile</h4>     \r\n            <he-form-item title=\"Fullname:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{fullname}} </p>\r\n            </he-form-item>     \r\n            <he-form-item title=\"Remarks:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{remarks}} </p>\r\n            </he-form-item>      \r\n\r\n            <h4 class=\"form-section\">Billing</h4>\r\n            <he-form-item title=\"Card Holder Name:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{card_name}} </p>\r\n            </he-form-item>      \r\n\r\n        </wizard-item>\r\n\r\n    </wizard>\r\n\r\n</div>\r\n",
      data: function data() {
          return {
              username: '',
              fullname: '',
              remarks: '',
              card_name: '',
              title: 'TEST Form Wizard ',
              stepItems: [{
                  target: '#tab1',
                  title: 'Account Setup'
              }, {
                  target: '#tab2',
                  title: 'Profile Setup'
              }, {
                  target: '#tab3',
                  title: 'Billing Setup'
              }, {
                  target: '#tab4',
                  title: 'Confirm'
              }],
              rulesOptions: {
                  //account
                  username: {
                      minlength: 5,
                      required: true
                  },
                  //profile
                  fullname: {
                      required: true
                  },
                  //payment
                  card_name: {
                      required: true
                  }
              }
          };
      },
      ready: function ready() {}
  });

});
