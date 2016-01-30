var Vue = require('lib/vue');
var App = require('common/app');

Vue.component('portlet', {
    template: __inline('main.html'),
    props: {
        'title': String,
        'icon': String,
    },
    ready: function() {

    }
});
