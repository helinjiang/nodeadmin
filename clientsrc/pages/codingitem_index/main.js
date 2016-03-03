require('common/global');

var Vue = require('lib/vue');

var App = require('/modules/common/app');
var CodingitemMain = require('/modules/codingitem_index/main');

window.app = new Vue({
    el: '#app',
    components: {
        CodingitemMain
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
