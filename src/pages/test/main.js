/**
 * Boot up the Vue instance and wire up the router.
 */

require('common/global');

var Vue = require('lib/vue');

var App = require('/modules/common/app');
var TestMain = require('/modules/test/main/main');

window.app = new Vue({
    el: '#app',
    components: {
        TestMain
    },
    ready: function() {
        // console.log('--',App);
        setTimeout(function() {
            App.init();
        }, 1000);
        // App.init();
    }
});
