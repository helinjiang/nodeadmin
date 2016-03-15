var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    props: {
        index: Number,
        total: Number
    },
    computed: {
        /**
         * 进度条宽度
         */
        width: function() {
            return ((this.index + 1) / this.total) * 100 + '%';
        }
    },
    ready: function() {

    }
});
