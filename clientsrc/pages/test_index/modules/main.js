var Vue = require('lib/vue');

var TestSelect2 = require('./testselect2/main');
var TestDate = require('./testdate/main');
var TestWizard = require('./testwizard/main');
var TestEditormd= require('./testeditormd/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        TestSelect2,
        TestDate,
        TestWizard,
        TestEditormd
    },
    ready: function() {

    }
});
