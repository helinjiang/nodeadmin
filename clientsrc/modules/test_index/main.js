var Vue = require('lib/vue');

var TestSelect2 = require('/modules/test_index/testselect2/main');
var TestDate = require('/modules/test_index/testdate/main');
var testWizard = require('/modules/test_index/testwizard/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        TestSelect2,
        TestDate,
        testWizard
    },
    ready: function() {

    }
});
