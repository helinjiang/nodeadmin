var Vue = require('lib/vue');

var Model = require('../model');
var mixinsIndexModal = require('mixins/modal/crudindex/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    mixins: [mixinsIndexModal],
    methods: {
        beforeShowDataGrid: function() {
            this.datagridTitle = '汽车信息列表';
            this.datagridCgi = '/admin/car/getdata';
            this.datagridType = 'server';

            this.datagridItem = Model.getDatagridItem([{
                name: 'id',
                title: '操作',
                render: 'commonOperate | detail modify delete',
                disableorder: true
            }]);
        },
        beforeShowAddPage: function() {
            this.modalTitle = '新增汽车信息';
            this.modalCgi = '/admin/car/add';

            this.modalFieldDefine = Model.getAddFieldDefine();
        },
        beforeShowModifyPage: function(data) {
            this.modalTitle = '修改汽车信息';
            this.modalCgi = '/admin/car/modify';

            this.modalFieldDefine = Model.getModifyFieldDefine();
        },
        beforeShowDetailPage: function(data) {
            this.modalTitle = '查看汽车信息';

            this.modalFieldDefine = Model.getDetailFieldDefine();
        },
        beforeShowDeletePage: function(data) {
            this.modalTitle = '删除汽车信息';
            this.modalCgi = '/admin/car/delete';

            this.modalFieldDefine = Model.getDeleteFieldDefine();
        },
    },
    ready: function() {

    }
});
