/**
 * Boot up the Vue instance and wire up the router.
 */

var Vue = require('lib/vue');

var App = require('/modules/common/app');
var AdminHeader = require('/modules/widget/adminheader/main');
var AdminFooter = require('/modules/widget/adminfooter/main');
var AdminSideMenu = require('/modules/widget/adminsidemenu/main');
var AdminMain = require('/modules/widget/adminmain/main');
var TestMain = require('/modules/test/main/main');

window.app = new Vue({
    el: '#app',
    components: {
        AdminHeader,
        AdminSideMenu,
        AdminMain,
        AdminFooter,
        TestMain
    },
    ready: function() {
        console.log('--',App);
        setTimeout(function() {
            App.init();
        }, 1000);
        // App.init();
    }
});
