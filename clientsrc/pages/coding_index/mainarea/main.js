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
            this.datagridTitle = '代码生成器信息列表';
            this.datagridUrl = '/admin/coding/getdata';

            this.datagridItem = Model.getDatagridItem([
                'id',
                'tableName',
                'targetName',
                'targetDesc',
                'menuId',
                'breadcrumb',
                'stateShow'
            ], null, [{
                name: 'id',
                title: '操作',
                render: 'commonOperate | detail modify delete',
                disableorder: true
            }]);
        },
        beforeShowAddPage: function() {
            this.saveTitle = '新增代码生成器信息';
            this.saveUrl = '/admin/coding/add';

            this.initData = {
                state: '1',
            };
        },
        beforeShowModifyPage: function(data) {
            this.saveTitle = '修改代码生成器信息';
            this.saveUrl = '/admin/coding/modify';

            this.initData = $.extend({}, data);
        },
        beforeShowDetailPage: function(data) {
            this.detailTitle = '查看代码生成器信息';

            this.initData = $.extend({}, data);
            this.detailField = Model.getNameMap([
                'id',
                'tableName',
                'targetName',
                'stateShow'
            ]);
        },
        beforeShowDeletePage: function(data) {
            this.deleteTitle = '删除代码生成器信息';
            this.deleteUrl = '/admin/coding/delete';

            this.initData = $.extend({}, data);
            this.deleteField = Model.getNameMap([
                'id',
                'tableName',
                'targetName',
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
