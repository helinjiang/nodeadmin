var Vue = require('lib/vue');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    props: ['title', 'desc'],
    methods: {
        setMenu: function(url) {
            this.$refs['menu'].show(url);
        },
        setTitle: function() {
            // TODO 此处采用调方法的方式可能会更好
            this.$refs['title'].name = this.title;
            this.$refs['title'].desc = this.desc || '';
        }
    },
    ready: function() {

    }
});

Vue.component('admin-main', MyComponent);
