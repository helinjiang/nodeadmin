/**
 * Boot up the Vue instance and wire up the router.
 */

require('common/global');

var Vue = require('lib/vue');

var App = require('/modules/common/app');
var UserMain = require('/modules/user_index/main/main');

window.app = new Vue({
    el: '#app',
    components: {
        UserMain
    },
    ready: function() {
        _init();
    }
});


function _init() {
    $(function() {
        App.init();
    });
}
