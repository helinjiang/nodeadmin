require('common/global');

var Vue = require('lib/vue');

var App = require('/modules/common/app');
var ProduceMain = require('/modules/produce_index/main');

window.app = new Vue({
    el: '#app',
    components: {
        ProduceMain
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
