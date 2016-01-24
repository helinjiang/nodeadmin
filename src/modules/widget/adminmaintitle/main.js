var Vue = require('lib/vue');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    filters: {
        ifNotLast: function(v) {
            return v < this.items.length - 1;
        }
    },
    data: function() {
        return {
            name: 'Blank Page',
            desc: 'This is blank page desc!',
            items: [{
                name: 'Home',
                url: 'index.html',
                icon: 'home'
            }, {
                name: 'Page Layouts'
            }, {
                name: 'Blank Page'
            }]
        }
    },
    ready: function() {

    }
});

Vue.component('admin-main-title', MyComponent);