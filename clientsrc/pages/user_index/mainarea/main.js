var Vue = require('lib/vue');

var Model = require('../model');
var mixinsIndexModal = require('mixins/modal/crudindex/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    mixins: [mixinsIndexModal],
    methods: {
        beforeShowDataGrid: function() {
            this.datagridTitle = '用户信息列表';
            this.datagridCgi = '/admin/user/getdata';

            this.datagridItem = Model.getDatagridItem([{
                name: 'id',
                title: '操作',
                render: 'commonOperate | detail modify delete',
                disableorder: true
            }]);
        },
        beforeShowAddPage: function() {
            this.modalTitle = '新增用户信息';
            this.modalCgi = '/admin/user/add';

            this.modalInitData = {
                birthday: '2016-03-01',
                state: '1',
            };

            this.modalFieldDefine = Model.getAddFieldDefine();
        },
        beforeShowModifyPage: function(data) {
            this.modalTitle = '修改用户信息';
            this.modalCgi = '/admin/user/modify';

            this.modalInitData = $.extend({}, data);
            this.modalFieldDefine = Model.getModifyFieldDefine();
        },
        beforeShowDetailPage: function(data) {
            this.modalTitle = '查看用户信息';

            this.modalInitData = $.extend({}, data);
            this.modalFieldDefine = Model.getDetailFieldDefine();
        },
        beforeShowDeletePage: function(data) {
            this.modalTitle = '删除用户信息';
            this.modalCgi = '/admin/user/delete';

            this.modalInitData = $.extend({}, data);
            this.modalFieldDefine = Model.getDeleteFieldDefine();
        },
    },
    ready: function() {

    }
});
