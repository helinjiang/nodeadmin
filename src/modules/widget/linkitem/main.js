var Vue = require('lib/vue');
var App = require('common/app');

Vue.component('link-item', {
    template: __inline('main.html'),
    props: {
        /**
         * 链接地址
         */
        'href': {
            type: String,
            'default': '#'
        },

        /**
         * icon名字
         */
        'icon': String,

        /**
         * 一共有三种图标，分别是fa\icon\glyphicons
         */
        'icontype': {
            type: String,
            'default': 'fa'
        },

        /**
         * badge name
         */
        'bname': String,

        /**
         * badge type
         * Default Primary Info Success Danger Warning
         */
        'btype': {
            type: String,
            'default': 'default'
        },
    },
    computed: {
        iconClass: function() {
            if (!this.icon) {
                return false;
            }

            var result;

            switch (this.icontype) {
                case 'icon':
                    result = this.icon;
                    break;
                case 'glyph':
                    result = 'glyphicon glyphicon-' + this.icon;
                    break;
                case 'fa':
                    result = 'fa fa-' + this.icon;
                    break;
                default:
                    result = this.icon;
                    break;
            }

            return result;
        }
    },
    ready: function() {

    }
});
