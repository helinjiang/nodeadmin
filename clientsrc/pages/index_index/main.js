/**
 * Boot up the Vue instance and wire up the router.
 */

require('common/global');

var Vue = require('lib/vue');

var App = require('/modules/common/app');
var IndexMain = require('/modules/index_index/main');

window.app = new Vue({
    el: '#app',
    components: {
        IndexMain
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
