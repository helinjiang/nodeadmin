var CommonCrud = require('common/crud');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        id: undefined,
        items: []
    },
    methods: {
        beforeShowModal: function(data) {
            if (!data || !data.id) {
                return;
            }

            // 设置要删除的记录的id
            this.id = data.id;

            // 设置要展示的信息条目
            this.items = [{
                key: 'id',
                value: data.id,
                title: 'ID'
            }, {
                key: 'user_name',
                value: data.user_name,
                title: '车主人'
            }, {
                key: 'name',
                value: data.name,
                title: '汽车名字'
            }, {
                key: 'buydate',
                value: data.buydate,
                title: '购买日期'
            }, {
                key: 'stateShow',
                value: data.stateShow,
                title: '状态'
            }];
        },
        triggerSubmit: function() {
            var self = this;

            $.post('/admin/car/delete', {
                id: this.id
            }, function(responseText, statusText) {
                self.dealSuccessRes(responseText, statusText);
            });
        }
    }
});
