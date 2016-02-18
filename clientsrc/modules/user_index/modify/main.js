var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            id: '',
            name: 'test'
        };
    },
    methods: {
        showModal: function(data) {
            this.$set('id', data.id);

            this.$children[0].show();
        }
    },
    ready: function() {

    }
});
