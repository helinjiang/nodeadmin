var Vue = require('lib/vue');

Vue.component('tip-alert', {
    template: __inline('main.html'),
    data: function() {
        return {
            isShow: false,
            type: 'danger', //danger,info,success,warning
            msg: '' //必填
        };
    },
    methods: {
        show: function(msg, type) {
            // msg 字段必填
            if (typeof msg !== "string" || !msg.length) {
                return;
            }
            this.msg = msg;

            // type 默认为 danger
            if (type) {
                this.type = type;
            }

            this.isShow = true;
        },
        hide: function(event) {
            this.isShow = false;

            // 这里非常重要，因为如果在表单里面，它会触发submit提交，必须要阻止
            // 且由于该方法可能也会被手工调用，因此event不一定存在
            if (event) {
                event.preventDefault();
            }
        }
    }
});
