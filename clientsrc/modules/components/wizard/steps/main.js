var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            length: String,
        };
    },
    methods: {
        getLength: function() {
            return this.length;
        }
    },
    ready: function() {
        this.length = this.$el.children.length;
    }
});
