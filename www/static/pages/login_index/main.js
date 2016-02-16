define('pages/login_index/main', function(require, exports, module) {

  /**
   * Boot up the Vue instance and wire up the router.
   */
  
  'use strict';
  
  require('modules/common/global');
  
  var Vue = require('modules/lib/vue');
  
  var LoginPanel = require('modules/login/loginpanel/main');
  
  window.app = new Vue({
    el: '#loginwrapper',
    data: {
      'currentView': 'index.html'
    },
    components: {
      LoginPanel: LoginPanel
    }
  });

});
