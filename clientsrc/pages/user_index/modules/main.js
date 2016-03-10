var Vue = require('lib/vue');

var saveModal = require('./savemodal/main');
var mixinsIndexModal = require('mixins/modal/crudindex/main');

module.exports = Vue.extend({
    components: {
        'saveModal': saveModal,
    },
    mixins: [mixinsIndexModal],
    methods: {
        beforeShowDataGrid: function() {
            this.datagridUrl = '/admin/user/getdata';
            this.datagridTitle = '用户信息列表';
            this.datagridItem = [{
                name: 'id',
                title: 'ID'
            }, {
                name: 'name',
                title: '用户名',
                css: 'namecss'
            }, {
                name: 'pwd',
                hide: true
            }, {
                name: 'birthday',
                title: '生日'
            }, {
                name: 'createTime',
                title: '创建时间'
            }, {
                name: 'updateTime',
                title: '最后更新时间'
            }, {
                name: 'stateShow',
                title: '状态'
            }, {
                name: 'id',
                title: '操作',
                render: 'commonOperate | detail modify delete',
                disableorder: true
            }];
        },
        beforeShowAddPage: function() {
            this.initData = {
                id: undefined,
                name: '',
                pwd: '',
                birthday: '2016-03-01',
                state: '1',
            };

            this.saveUrl = '/admin/user/add';
            this.saveTitle = '新增用户信息';
        },
        beforeShowModifyPage: function(data) {
            this.initData = $.extend({}, data);

            this.saveUrl = '/admin/user/modify';
            this.saveTitle = '修改用户信息';
        },
        beforeShowDetailPage: function(data) {
            this.initData = $.extend({}, data);
            this.detailField = {
                id: 'ID',
                name: '用户名',
                birthday: '生日',
                stateShow: '状态',
                createTime: '创建时间',
                updateTime: '最后修改时间',
            };
            this.detailTitle = '查看用户信息';
        },
        beforeShowDeletePage: function(data) {
            this.initData = $.extend({}, data);
            this.deleteField = {
                id: 'ID',
                name: '用户名',
                stateShow: '状态',
                createTime: '创建时间',
                updateTime: '最后修改时间',
            };

            this.deleteParam = [{
                key: 'id',
                fieldName: 'id'
            }];

            this.deleteUrl = '/admin/user/delete';
            this.deleteTitle = '删除用户信息';
        },
    },
    ready: function() {

    }
});
