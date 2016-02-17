/**
 * 
 */

var Vue = require('lib/vue');


Vue.component('datagrid-item', {
    template: __inline('main.html'),
    props: {
        /**
         * 数据的字段名
         */
        'name': {
            type: String,
            required: true
        },
        'title': String,
        /**
         * 渲染方法名
         */
        'render': String,
    },
    ready: function() {

    }
});
