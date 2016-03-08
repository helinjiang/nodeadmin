var Vue = require('lib/vue');

Vue.component('he-button', {
    template: __inline('main.html'),
    props: {
        type: {
            type: String,
            'default': 'default'
        },
        icon: String,
    },
    ready: function() {
        
    }
});
