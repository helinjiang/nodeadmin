define('modules/components/wizard/steps/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<ul class=\"nav nav-pills nav-justified steps\">\r\n    <li v-for=\"item in items\">\r\n        <a href=\"{{item.target}}\" data-toggle=\"tab\" class=\"step\">\r\n            <span class=\"number\"> {{$index+1}} </span>\r\n            <span class=\"desc\">\r\n                        <i class=\"fa fa-check\"></i> {{item.title}} \r\n            </span>\r\n        </a>\r\n    </li>\r\n</ul>\r\n",
      data: function data() {
          return {
              items: [{
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
              }]
          };
      },
      props: {
          index: Number
      },
      methods: {
          getLength: function getLength() {
              return this.items.length;
          }
      },
      ready: function ready() {}
  });

});
