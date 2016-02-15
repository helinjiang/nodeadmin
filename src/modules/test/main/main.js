var Vue = require('lib/vue');

var toolbar = require('/modules/test/toolbar/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        'toolbar': toolbar
    },
    ready: function() {

    }
});
