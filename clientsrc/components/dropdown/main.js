var Vue = require('lib/vue');

Vue.component('dropdown', {
    template: __inline('main.html'),
    props: {
        'id': {
            type: String,
            'default': ''
        },
        'css': {
            type: String,
            'default': ''
        },
    },
    ready: function() {

    }
});
