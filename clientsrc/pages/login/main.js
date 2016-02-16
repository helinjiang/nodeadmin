/**
 * Boot up the Vue instance and wire up the router.
 */

require('common/global');

var Vue = require('lib/vue');

var LoginPanel = require('/modules/login/loginpanel/main');

window.app = new Vue({
  el: '#loginwrapper',
  data: {
    'currentView': 'index.html'
  },
  components: {
    LoginPanel
  }
});
