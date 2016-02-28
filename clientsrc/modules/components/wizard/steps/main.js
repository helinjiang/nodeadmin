var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            doneClass: 'done'
        };
    },
    props: {
        /**
         * 当前是第几步，从0开始
         */
        index: Number,

        /**
         * 步骤的配置
         */
        items: {
            type: Array,
            required: true
        }
    },
    methods: {
        getLength: function() {
            return this.items.length;
        }
    },
    ready: function() {

    }
});
