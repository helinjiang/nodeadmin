var Vue = require('lib/vue');

Vue.component('admin-header', {
    template: __inline('main.html'),
    props: {
        /**
         * 登录用户的用户名
         */
        'username': {
            type: String,
            required: true
        },
    },
    ready: function() {

    }
});
