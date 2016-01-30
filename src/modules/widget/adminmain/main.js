var Vue = require('lib/vue');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    props: {
        'menuId': {
            type: String,
            required: true
        },
        'title': {
            type: String,
            required: true
        },
        'desc': {
            type: String,
            'default': ''
        },
    },
    ready: function() {

    }
});

Vue.component('admin-main', MyComponent);
