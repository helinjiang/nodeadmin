var Vue = require('lib/vue');


// define the item component
var MyComponent = Vue.extend({
    template: __inline('main.html'),
    props: {
        model: Object
    },
    data: function() {
        return {
            open: false
        }
    },
    computed: {
        isFolder: function() {
            return this.model.children && this.model.children.length
        }
    }
});

Vue.component('admin-side-menu-item', MyComponent);
