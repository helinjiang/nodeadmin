var Vue = require('lib/vue');

var addPage = require('./add/main');
var modifyPage = require('./modify/main');
var deletePage = require('./delete/main');
var detailPage = require('./detail/main');
var codinginfoPage = require('./codinginfo/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        'add': addPage,
        'modify': modifyPage,
        'delete': deletePage,
        'detail': detailPage,
        'codinginfo': codinginfoPage
    },
    props: {
        /**
         * thinkjs后台设置过来的值，由于无法传递对象，因此此处需要进行一些转义
         */
        'assign': {
            required: true,
            coerce: function(val) {
                return JSON.parse(val);
            }
        }
    },
    computed: {
        // 一个计算属性的 getter
        getdataurl: function() {
            // `this` 指向 vm 实例
            return '/admin/codingitem/getdata/codingid/' + this.assign.id;
        }
    },
    methods: {
        operate: function(event) {
            var target = event.target,
                $target = $(target),
                type = $target.data('type'),
                id,
                data;

            if (!type || ['modify', 'delete', 'detail'].indexOf(type) < 0) {
                return;
            }

            id = $target.data('id');

            data = this.getDataById(id);

            if (data) {
                this.$refs[type].showModal(data);
            }
        },
        reloadDataGrid: function() {
            this.$refs.datagrid.reload();
        },
        getDataById: function(id) {
            if (!id) {
                console.error('No ID!');
                return;
            }

            var data = this.$refs.datagrid.getDataById('id', id);

            if (!data) {
                console.error('No data of id=' + id);
                return;
            }

            return data;
        }
    },
    ready: function() {

    }
});
