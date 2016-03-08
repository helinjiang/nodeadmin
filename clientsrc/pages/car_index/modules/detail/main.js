var CommonCrud = require('common/crud');

var Names = require('common/names');

module.exports = CommonCrud.extend({
    template: __inline('main.html'),
    data: {
        items: []
    },
    methods: {
        beforeShowModal: function(data) {
            if (!data) {
                return;
            }
	    
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
            this.hideModal();
        }
    }
});
