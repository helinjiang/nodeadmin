var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    props: {
        index: Number,
        total: Number
    },
    methods: {
        triggerCancel: function() {
            alert('canceled!');
            this.$dispatch('wizardcancel');
        },
        triggerSubmit: function() {
            alert('Finished! Hope you like it :) 111');
        }
    },
    ready: function() {

    }
});
