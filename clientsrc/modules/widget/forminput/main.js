var Vue = require('lib/vue');

Vue.component('form-input', {
    template: __inline('main.html'),
    props: {
        /**
         * 
         */
        'id': String,
	
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

        /**
         * input 的 value 值，不限定什么类型
         */
        'value': 'null',

        'autocomplete': {
            type: String,
            'default': 'on'
        },

        'readonly': {
            type: Boolean,
            'default': false
        },

        'horizontal': {
            type: Boolean,
            'default': false
        },

        /**
         * 如果是水平排列的话，则需要定义左右的宽度，格式为x-x，其中x值为1到12
         */
        'col': {
            type: String,
            'default': '3-9'
        }

    },
    computed: {
        colLeft: function() {
            var defaultVal = 3,
                val;

            if (!this.col) {
                return defaultVal;
            }

            val = parseInt(this.col.split('-')[0], 10);

            if (isNaN(val) || val < 1 || val > 12) {
                return defaultVal;
            } else {
                return val;
            }
        },
        colRight: function() {
            var defaultVal = 9,
                val;

            if (!this.col) {
                return defaultVal;
            }

            val = parseInt(this.col.split('-')[1], 10);

            if (isNaN(val) || val < 1 || val > 12) {
                return defaultVal;
            } else {
                return val;
            }
        }
    },
    ready: function() {

    }
});
