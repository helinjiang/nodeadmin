var Vue = require('lib/vue');

var savePage = require('../save/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            codingId: -1,
            codingName: ''
        };
    },
    components: {
        savePage
    },
    props: {
        /**
         * 是否展现add页
         */
        isShow: Boolean,
        assign: {
            required: true,
            type: Object
        }
    },
    methods: {
        show: function() {
            this.isShow = true;
        }
    },
    ready: function() {
        this.codingId = this.assign.id;
        this.codingName = this.assign.tableName + '-' + this.assign.targetName + '(' + this.assign.id + ')';

    }
});
