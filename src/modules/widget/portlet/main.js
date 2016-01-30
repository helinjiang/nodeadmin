var Vue = require('lib/vue');
var App = require('common/app');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    props: {
        'title': String,
        'icon': String,
    },
    ready: function() {

    }
});


Vue.component('portlet', MyComponent);
