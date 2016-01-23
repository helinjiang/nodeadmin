var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            name: 'Blank Page',
            desc: 'This is blank page desc!'
        }
    },
    ready: function() {

    }
});
