var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    props: {
        'assign': {
            type:Object,
            required: true
        }
    },
    ready: function() {

    }
});
