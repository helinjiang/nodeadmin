var Vue = require('lib/vue');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    filters: {
        ifLast: function(v) {
            console.log('--=', v, this.data);
return true;
        }
    },
    data: function() {
        return {
            name: 'Blank Page',
            desc: 'This is blank page desc!',
            data: [{
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