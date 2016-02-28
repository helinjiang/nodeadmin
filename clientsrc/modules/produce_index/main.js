var Vue = require('lib/vue');

var ProduceWizard = require('./wizard/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        ProduceWizard
    },
    ready: function() {

    }
});
