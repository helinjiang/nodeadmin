require('common/global');

var Vue = require('lib/vue');

var App = require('common/app');
var MainArea = require('./mainarea/main');

window.app = new Vue({
    el: '#app',
    components: {
        MainArea
    },
    ready: function() {
        $(function() {
            App.init();
        });
    }
});