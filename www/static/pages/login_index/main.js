define('pages/login_index/main', function(require, exports, module) {

  /**
   * Boot up the Vue instance and wire up the router.
   */
  
  'use strict';
  
  require('modules/common/global');
  
  var Vue = require('modules/lib/vue');
  
  var LoginHeader = require('modules/login_index/loginheader/main');
  var LoginFooter = require('modules/login_index/loginfooter/main');
  var LoginPanel = require('modules/login_index/loginpanel/main');
  
  window.app = new Vue({
      el: '#app',
      components: {
          LoginHeader: LoginHeader,
          LoginFooter: LoginFooter,
          LoginPanel: LoginPanel
      }
  });

});
