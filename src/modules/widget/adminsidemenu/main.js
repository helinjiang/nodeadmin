var Vue = require('lib/vue');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    ready: function() {

    }
});

Vue.component('admin-side-menu', MyComponent);