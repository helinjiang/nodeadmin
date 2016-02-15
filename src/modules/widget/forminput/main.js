var Vue = require('lib/vue');

Vue.component('form-input', {
    template: __inline('main.html'),
    props: {
        /**
         * text/password
         */
        'type': {
            type: String,
            'default': 'text'
        },

        /**
         *是否使用icon，非必须，在输入框前面显示图标，会自动生成类似<i class="fa fa-user"></i>，其中的icon就是user
         * user: 用户名
         */
        'icon': String,

        /**
         * 字段的解释，非必须，会自动生成类似<label class="control-label">用户名</label>
         */
        'title': String,

        /**
         * 是否显示title，非必须，默认显示，即显示<lable>
         */
        'hidetitle': {
            type: Number,
            'default': 0
        },

        /**
         * input 的name 值，必须
         */
        'name': {
            type: String,
            required: true
        },
    },
    ready: function() {

    }
});
