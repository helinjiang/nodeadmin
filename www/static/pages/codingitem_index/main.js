define('pages/codingitem_index/main', function(require, exports, module) {

  'use strict';
  
  require('modules/common/global');
  
  var Vue = require('modules/lib/vue');
  
  var App = require('modules/common/app');
  var CodingitemMain = require('modules/codingitem_index/main');
  
  window.app = new Vue({
      el: '#app',
      components: {
          CodingitemMain: CodingitemMain
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
