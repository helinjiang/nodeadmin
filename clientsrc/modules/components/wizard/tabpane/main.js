var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    props: {
        'id': String,
        'css': String,
        'title': String,
    },
    ready: function() {

    }
});
