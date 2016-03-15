var Vue = require('lib/vue');

Vue.component('wizard-item', {
    template: __inline('main.html'),
    props: {
        'id': String,
        'css': String,
        'title': String,
    },
    ready: function() {

    }
});
