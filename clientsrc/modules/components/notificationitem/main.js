var Vue = require('lib/vue');

Vue.component('notification-item', {
    template: __inline('main.html'),
    props: {
        'href': {
            type: String,
            'default': '#'
        },
        'type': {
            type: String,
            'default': 'default'
        },
        'icon': {
            type: String,
            'default': 'plus'
        },
        'time': {
            type: String,
            'default': ''
        }
    },
    ready: function() {

    }
});
