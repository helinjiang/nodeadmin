var Vue = require('lib/vue');

Vue.component('portlet', {
    template: __inline('main.html'),
    props: {
        id: String,
        'title': String,
        'icon': String,
        'bodycss': String,
    },
    ready: function() {

    }
});
