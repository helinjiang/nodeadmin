var Vue = require('lib/vue');
var App = require('common/app');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    ready: function() {
        _init();
    }
});


Vue.component('admin-footer', MyComponent);

function _init() {
    $(function() {
        handleGoTop(); //handles scroll to top functionality in the footer
    });
}

// Handles the go to top button at the footer
var handleGoTop = function() {
    /* set variables locally for increased performance */
    jQuery('.footer').on('click', '.go-top', function(e) {
        App.scrollTo();
        e.preventDefault();
    });
}
