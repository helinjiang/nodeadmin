var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    props: {
        value: String,
    },
    ready: function() {
        
    }
});
