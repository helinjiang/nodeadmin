var Vue = require('lib/vue');

var addPage = require('./add/main');
var modifyPage = require('./modify/main');
var deletePage = require('./delete/main');
var detailPage = require('./detail/main');
var codinginfoPage = require('./codinginfo/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            isShowToolbar: true,
            isShowAddPage: false,
            isShowDatagrid: true,
        };
    },
    components: {
        addPage,
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
        getDataUrl: function() {
            // `this` 指向 vm 实例
            return '/admin/codingitem/getdata/codingid/' + this.assign.id;
        }
    },
    methods: {
        /**
         * 打开新增页面
         */
        showAddPage: function() {
            this.isShowToolbar = false;
            this.isShowAddPage = true;
            this.isShowDatagrid = false;
        },
        backToInit: function() {
            this.isShowToolbar = true;
            this.isShowAddPage = false;
            this.isShowDatagrid = true;
        },
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
