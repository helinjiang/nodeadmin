var Vue = require('lib/vue');

var validator = require('common/validator');
var Msg = require('components/msg/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            items: []
        };
    },
    methods: {
        showModal: function(data) {
            this.items = [{
                key: 'id',
                value: data.id,
                title: 'ID'
            }, {
                key: 'name',
                value: data.name,
                title: '用户名'
            }, {
                key: 'birthday',
                value: data.birthday,
                title: '生日'
            }, {
                key: 'stateShow',
                value: data.stateShow,
                title: '状态'
            }, {
                key: 'createTime',
                value: data.createTime,
                title: '创建时间'
            }, {
                key: 'updateTime',
                value: data.updateTime,
                title: '最后修改时间'
            }];

            this.$children[0].show();
        },
        hideModal: function() {
            this.$children[0].hide();
        },
        reportSuccess: function(data) {
            this.$dispatch('savesuccess', data);
        },
        saveSubmit: function(msg) {
            var self = this;

            $.post('/admin/user/delete', {
                id: this.id
            }, function(responseText, statusText) {
                console.log(responseText, statusText);
                if (statusText !== 'success' || responseText.errno !== 0) {
                    // 提示失败
                    Msg.error('删除' + self.name + '(' + self.id + ')出错！' + JSON.stringify(responseText));
                } else {
                    // 提示成功
                    Msg.success('删除' + JSON.stringify(responseText.data) + '成功！');

                    // 关闭对话框
                    self.hideModal();

                    // 刷新列表
                    self.reportSuccess(responseText.data);
                }
            });
        }
    },
    ready: function() {

    }
});
