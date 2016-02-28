var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            username: '',
            fullname: '',
            remarks: '',
            card_name: '',
            title: 'TEST Form Wizard ',
            stepItems: [{
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
            }],
            rulesOptions: {
                //account
                username: {
                    minlength: 5,
                    required: true
                },
                //profile
                fullname: {
                    required: true
                },
                //payment
                card_name: {
                    required: true
                }
            }
        };
    },
    ready: function() {

    }
});
