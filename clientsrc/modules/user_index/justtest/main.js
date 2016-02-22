var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            select2data: [{
                id: 1,
                text: 'hello'
            }, {
                id: 2,
                text: 'world'
            }, {
                id: 3,
                text: 'what'
            }]
        }
    },
    props: {
        debug: {
            type: Boolean
        }
    },
    ready: function() {

    }
});
