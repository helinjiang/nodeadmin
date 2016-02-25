require('common/global');

var Vue = require('lib/vue');

var App = require('/modules/common/app');
var TestMain = require('/modules/test_index/main');

window.app = new Vue({
    el: '#app',
    components: {
        TestMain
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
