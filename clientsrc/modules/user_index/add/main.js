var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    methods: {
        showModal: function() {
            this.$children[0].show();
        },
        save: function(msg) {
            console.log('next to save add', msg);
        }
    },
    ready: function() {

    }
});
