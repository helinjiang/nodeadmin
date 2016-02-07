var Vue = require('lib/vue');
var App = require('common/app');

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
