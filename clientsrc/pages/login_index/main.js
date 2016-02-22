/**
 * Boot up the Vue instance and wire up the router.
 */

require('common/global');

var Vue = require('lib/vue');

var LoginHeader = require('/modules/login_index/loginheader/main');
var LoginFooter = require('/modules/login_index/loginfooter/main');
var LoginPanel = require('/modules/login_index/loginpanel/main');

window.app = new Vue({
    el: '#app',
    components: {
        LoginHeader,
        LoginFooter,
        LoginPanel
    }
});
