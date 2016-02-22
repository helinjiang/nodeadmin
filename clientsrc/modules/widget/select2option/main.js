var Vue = require('lib/vue');

Vue.component('select2-option', {
    template: __inline('main.html'),
    props: {
        /**
         * 选项名字
         */
        'title': {
            type: String,
            required: true
        },

        /**
         * 选项值
         */
        'value': {
            type: String,
            'default': '',
        },


    },
    ready: function() {

    }
});
