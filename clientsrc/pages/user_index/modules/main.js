var Vue = require('lib/vue');

var saveModal = require('./savemodal/main');
var mixinsBasicIndexModal = require('mixins/basic_index_modal');

module.exports = Vue.extend({
    template: __inline('main.html'),
    components: {
        'saveModal': saveModal,
    },
    mixins: [mixinsBasicIndexModal],
    methods: {
        beforeShowAddPage: function() {
            this.initData = {
                id: undefined,
                name: '',
                pwd: '',
                birthday: '2016-03-01',
                state: '1',
            };
        },
        beforeShowModifyPage: function(data) {
            this.initData = $.extend({}, data);
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
        },       
    },
    ready: function() {

    }
});
