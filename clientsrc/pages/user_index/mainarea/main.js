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

            this.modalFieldDefine = [{
                filedName: 'name',
                elementType: 'input'
            }, {
                filedName: 'pwd',
                elementType: 'input',
                elementParam: {
                    type: 'password'
                }
            }, {
                filedName: 'state',
                elementType: 'select2',
                elementParam: {
                    options: [{
                        title: '有效',
                        value: '1'
                    }, {
                        title: '无效',
                        value: '-1'
                    }]
                }
            }, {
                filedName: 'birthday',
                elementType: 'date'
            }];

            this.saveField = Model.getFieldTitleMap([
                'name',
                'birthday',
                'state',
                'pwd'
            ]);

            var config = {};

            config.state = {
                required: true
            };

            config.birthday = {
                required: {
                    rule: true,
                    message: '生日不能为空！'
                }
            };

            config.name = {
                required: {
                    rule: true,
                    message: '用户名不能为空！'
                },
                minlength: {
                    rule: 3,
                    message: '最小长度为3'
                },
                maxlength: {
                    rule: 64,
                    message: '最大长度为64'
                }
            };

            config.pwd = {
                required: {
                    rule: true,
                    message: '密码不能为空！'
                },
                minlength: {
                    rule: 5,
                    message: '最小长度为5'
                },
                maxlength: {
                    rule: 32,
                    message: '最大长度为32'
                }
            };

            this.validatorOptions = config;
        },
        beforeShowModifyPage: function(data) {
            this.modalTitle = '修改用户信息';
            this.modalCgi = '/admin/user/modify';

            this.modalInitData = $.extend({}, data);

            this.modalFieldDefine = [{
                filedName: 'id',
                elementType: 'input',
                elementParam: {
                    readonly: true
                }
            }, {
                filedName: 'name',
                elementType: 'input',
                elementParam: {
                    readonly: true
                }
            }, {
                filedName: 'state',
                elementType: 'select2',
                elementParam: {
                    options: [{
                        title: '有效',
                        value: '1'
                    }, {
                        title: '无效',
                        value: '-1'
                    }]
                }
            }, {
                filedName: 'birthday',
                elementType: 'date'
            }];

            this.saveField = Model.getFieldTitleMap([
                'id',
                'name',
                'birthday',
                'state'
            ]);

            var config = {};

            config.state = {
                required: true
            };

            config.birthday = {
                required: {
                    rule: true,
                    message: '生日不能为空！'
                }
            };

            this.validatorOptions = config;
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

            this.deleteParam = Model.getDeleteParam();
        },
    },
    ready: function() {

    }
});
