require('common/global');

var Vue = require('lib/vue');

var App = require('common/app');
var IndexMain = require('./modules/main');

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
