var Vue = require('lib/vue');


// define the item component
var MyComponent = Vue.extend({
    template: __inline('main.html'),
    props: {
        model: Object,
        mindex: Number,
        mtotal: Number
    },
    data: function() {
        return {
            open: false
        }
    },
    computed: {
        isFolder: function() {
            return this.model.children && this.model.children.length
        },
        licss: function() {
            if (typeof this.mindex !== 'number' || typeof this.mtotal !== 'number') {
                return '';
            }

            if (this.mindex == 0) {
                return 'start';
            }

            if (this.mindex + 1 >= this.mtotal) {
                return 'last';
            }

            return '';
        }
    }
});

Vue.component('admin-side-menu-item', MyComponent);
