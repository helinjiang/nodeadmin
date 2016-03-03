define('pages/coding_index/main', function(require, exports, module) {

  'use strict';
  
  require('modules/common/global');
  
  var Vue = require('modules/lib/vue');
  
  var App = require('modules/common/app');
  var CodingMain = require('modules/coding_index/main');
  
  window.app = new Vue({
      el: '#app',
      components: {
          CodingMain: CodingMain
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
