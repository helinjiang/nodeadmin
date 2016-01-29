var Vue = require('lib/vue');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    methods:{
        setMenu:function(url){
            this.$refs['menu'].show(url);
        }
    },
    ready: function() {

    }
});

Vue.component('admin-main', MyComponent);
