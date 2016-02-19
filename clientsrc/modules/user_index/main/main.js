var Vue = require('lib/vue');

var add = require('/modules/user_index/add/main');
var modify = require('/modules/user_index/modify/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        'add': add,
        'modify': modify
    },
    methods: {
        operate: function(event) {
            console.log('operate', event.target);
            var target = event.target,
                $target = $(target),
                type = $target.data('type');

            if (!type) {
                return;
            }

            switch (type) {
                case 'modify':
                    showDlgModify(this, $target);
                    break;
                default:
                    break;
            }
        },
        reloadDataGrid: function() {
            this.$refs.datagrid.reload();
        }
    },
    ready: function() {

    }
});

function showDlgModify(vm, jqTarget) {
    var id = jqTarget.data('id'),
        data;

    if (!id) {
        console.error('No ID!');
        return;
    }

    data = vm.$refs.datagrid.getDataById('id', id);
    if (!data) {
        console.error('No data of id=' + id);
        return;
    }

    // console.log(data);

    vm.$refs.modify.showModal({
        id: data.id,
        name: data.name
    });
}
