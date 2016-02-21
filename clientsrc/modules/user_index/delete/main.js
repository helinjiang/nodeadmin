var Vue = require('lib/vue');

var validator = require('common/validator');
var Msg = require('/modules/widget/msg/main');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            id: undefined,
            name: undefined,
            stateShow: undefined
        };
    },
    methods: {
        showModal: function(data) {
            this.id = data.id;
            this.name = data.name;
            this.stateShow = data.stateShow;

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
                    Msg.error('删除' + JSON.stringify(responseText.data) + '出错！');
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
