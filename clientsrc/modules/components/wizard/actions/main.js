var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    props: {
        index: Number,
        total: Number
    },
    methods:{
        triggerSubmit: function(){
            alert('Finished! Hope you like it :) 111');
        }
    },
    ready: function() {

    }
});
