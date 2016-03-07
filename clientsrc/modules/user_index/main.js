var Vue = require('lib/vue');

var addPage = require('./add/main');
var modifyPage = require('./modify/main');
var deletePage = require('./delete/main');
var detailPage = require('./detail/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        'add': addPage,
        'modify': modifyPage,
        'delete': deletePage,
        'detail': detailPage
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
