var Vue = require('lib/vue');

var savePage = require('../save/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        savePage
    },
    props: {
        assign: {
            required: true,
            type: Object
        }
    },
    ready: function() {

    }
});
