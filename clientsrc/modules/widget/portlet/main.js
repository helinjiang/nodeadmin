var Vue = require('lib/vue');

Vue.component('portlet', {
    template: __inline('main.html'),
    props: {
        'title': String,
        'icon': String,
    },
    ready: function() {

    }
});
