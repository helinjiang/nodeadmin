var Vue = require('lib/vue');

var add = require('/modules/user_index/add/main');
var modify = require('/modules/user_index/modify/main');
var deletePage = require('/modules/user_index/delete/main');
var justtest = require('/modules/user_index/justtest/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        'add': add,
        'modify': modify,
        'delete': deletePage,
        'justtest': justtest
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
                case 'delete':
                    showDlgDelete(this, $target);
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
        name: data.name,
        state: data.state,
        birthday: data.birthday
    });
}

function showDlgDelete(vm, jqTarget) {
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

    vm.$refs.delete.showModal({
        id: data.id,
        name: data.name,
        stateShow: data.stateShow
    });
}