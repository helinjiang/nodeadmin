require('common/global');

var Vue = require('lib/vue');

var App = require('/modules/common/app');
var CodingMain = require('/modules/coding_index/main');

window.app = new Vue({
    el: '#app',
    components: {
        CodingMain
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
