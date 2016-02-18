var Vue = require('lib/vue');

var add = require('/modules/test/add/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        'add': add
    },
    methods:{
        operate:function(event){
            console.log('operate',event.target);
        }
    },
    ready: function() {

    }
});
