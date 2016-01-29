var Vue = require('lib/vue');


// define the item component
var MyComponent = Vue.extend({
    template: __inline('main.html'),
    props: {
        model: Object,
        mindex: Number,
        mtotal: Number
    },
    computed: {
        isFolder: function() {
            return this.model.children && this.model.children.length;
        },
        licss: function() {
            var arr = [];
            if (typeof this.mindex !== 'number' || typeof this.mtotal !== 'number') {
                arr.push('');
            } else if (this.mindex == 0) {
                arr.push('start');
            } else if (this.mindex + 1 >= this.mtotal) {
                arr.push('last');
            } else {
                arr.push('');
            }

            if(this.model.active){
                arr.push('active');
            }

            return arr.join(' ');
        }
    }
});

Vue.component('admin-side-menu-item', MyComponent);
