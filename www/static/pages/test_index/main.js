define('pages/test_index/main', function(require, exports, module) {

  'use strict';
  
  require('modules/common/global');
  
  var Vue = require('modules/lib/vue');
  
  var App = require('modules/common/app');
  var TestMain = require('modules/test_index/main/main');
  
  window.app = new Vue({
      el: '#app',
      components: {
          TestMain: TestMain
      },
      ready: function ready() {
          _init();
      }
  });
  
  function _init() {
      $(function () {
          App.init();
      });
  }

});
