var Vue = require('lib/vue');

var menuData = require('common/menudata');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    filters: {
        ifNotLast: function(v) {
            return v < this.items.length - 1;
        }
    },
    props: {
        'title': {
            type: String,
            required: true
        },
        'desc': String,
    },
    data: function() {
        return {
            items: [{
                name: 'Home',
                url: 'index.html',
                icon: 'home'
            }, {
                name: 'Page Layouts'
            }, {
                name: 'Blank Page'
            }]
        };
    },
    ready: function() {

    }
});

Vue.component('admin-main-title', MyComponent);