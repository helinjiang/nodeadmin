var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            id: '',
            name: ''
        };
    },
    methods: {
        showModal: function(data) {
            this.$set('id', data.id);
            this.$set('name', data.name);

            this.$children[0].show();
        }
    },
    ready: function() {

    }
});
