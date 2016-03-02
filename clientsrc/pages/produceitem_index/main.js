require('common/global');

var Vue = require('lib/vue');

var App = require('/modules/common/app');
var ProduceitemMain = require('/modules/produceitem_index/main');

window.app = new Vue({
    el: '#app',
    components: {
        ProduceitemMain
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
