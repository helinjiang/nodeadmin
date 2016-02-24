define('pages/index_index/main', function(require, exports, module) {

  /**
   * Boot up the Vue instance and wire up the router.
   */
  
  'use strict';
  
  require('modules/common/global');
  
  var Vue = require('modules/lib/vue');
  
  var App = require('modules/common/app');
  var IndexMain = require('modules/index_index/main');
  
  window.app = new Vue({
      el: '#app',
      components: {
          IndexMain: IndexMain
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
