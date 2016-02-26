var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            doneClass:'done',
            items: [{
                target: '#tab1',
                title: 'Account Setup'
            }, {
                target: '#tab2',
                title: 'Profile Setup'
            }, {
                target: '#tab3',
                title: 'Billing Setup'
            }, {
                target: '#tab4',
                title: 'Confirm'
            }]
        };
    },
    props: {
        index: Number
    },
    methods: {
        getLength: function() {
            return this.items.length;
        }
    },
    ready: function() {

    }
});
