var Vue = require('lib/vue');
var App = require('common/app');

var MyComponent = Vue.extend({
    template: __inline('main.html'),
    ready: function() {
        _init();
    }
});

Vue.component('admin-header', MyComponent);

function _init() {
    $(function() {
        handleQuickSearch(); // handles quick search 
    });
}


var handleQuickSearch = function() {

    // handle search for header search input on enter press
    $('.search-form-header').on('keypress', 'input.form-control', function(e) {
        if (e.which == 13) {
            $('.search-form-header').submit();
            return false;
        }
    });

    // handle search for header search input on icon click
    $('.search-form-header').on('click', '.icon-search', function(e) {
        $('.search-form-header').submit();
        return false;
    });

}
