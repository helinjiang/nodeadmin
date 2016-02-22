/**
 * Boot up the Vue instance and wire up the router.
 */

require('common/global');

var Vue = require('lib/vue');

var LoginHeader = require('/modules/login_index/header/main');
var LoginFooter = require('/modules/login_index/footer/main');
var LoginContainer = require('/modules/login_index/container/main');
var LoginPanel = require('/modules/login_index/loginpanel/main');

window.app = new Vue({
    el: '#app',
    components: {
        LoginHeader,
        LoginContainer,
        LoginFooter,
        LoginPanel
    }
});
