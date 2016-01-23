var Vue = require('lib/vue');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            name: 'Blank Page',
            desc: 'This is blank page desc!'
        }
    },
    ready: function() {

    }
});

Vue.component('admin-main-title', MyComponent);