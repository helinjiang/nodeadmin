var Vue = require('lib/vue');
var App = require('common/app');

Vue.component('admin-footer', {
    template: __inline('main.html'),
    data: function() {
        return {
            year: ''
        }
    },
    methods: {
        goTop: function(event) {
            App.scrollTo();

            // 如果该方法可能被手工调用，则event不一定存在
            if (event) {
                event.preventDefault();
            }
        }
    },
    ready: function() {
        this.year = new Date().getFullYear();
    }
});
