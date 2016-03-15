var Vue = require('lib/vue');

var Model = require('../model');
var saveModal = require('./savemodal/main');
var mixinsIndexModal = require('mixins/modal/crudindex/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        'saveModal': saveModal,
    },
    mixins: [mixinsIndexModal],
    methods: {
        beforeShowDataGrid: function() {
            this.datagridTitle = '汽车信息列表';
            this.datagridUrl = '/admin/car/getdata';
            this.saveUrlType = 'server';

            this.datagridItem = Model.getDatagridItem([
                'id',
                'user_name',
                'name',
                'buydate',
                'stateShow'
            ], null, [{
                name: 'id',
                title: '操作',
                render: 'commonOperate | detail modify delete',
                disableorder: true
            }]);
        },
        beforeShowAddPage: function() {
            this.saveTitle = '新增汽车信息';
            this.saveUrl = '/admin/car/add';

            this.initData = {
                buydate: '2016-03-01',
                state: '1',
            };
        },
        beforeShowModifyPage: function(data) {
            this.saveTitle = '修改汽车信息';
            this.saveUrl = '/admin/car/modify';

            this.initData = $.extend({}, data);
        },
        beforeShowDetailPage: function(data) {
            this.detailTitle = '查看汽车信息';

            this.initData = $.extend({}, data);
            this.detailField = Model.getNameMap([
                'id',
                'user_name',
                'name',
                'buydate',
                'stateShow'
            ]);
        },
        beforeShowDeletePage: function(data) {
            this.deleteTitle = '删除汽车信息';
            this.deleteUrl = '/admin/car/delete';

            this.initData = $.extend({}, data);
            this.deleteField = Model.getNameMap([
                'id',
                'user_name',
                'name',
                'buydate',
                'stateShow'
            ]);

            this.deleteParam = [{
                key: 'id',
                fieldName: 'id'
            }];
        },
    },
    ready: function() {

    }
});
