var Vue = require('lib/vue');

Vue.component('he-checkbox', {
    template: __inline('main.html'),
    data: function() {
        return {
            checkboxElem: undefined
        };
    },
    props: {
        /**
         * checkbox 的 name 值，必须
         */
        name: {
            type: String,
            required: true
        },
        checked: Boolean,
        title: String,
    },
    watch: {
        /**
         * 此处一定要注意，当checked值变化时，要重新uniform一下，否则会不渲染
         */
        checked: function(val, oldVal) {
            this.handleUniform();
        }
    },
    methods: {
        isChecked: function() {
            return checked;
        },
        handleUniform: function() {
            if (!jQuery().uniform) {
                return;
            }

            this.checkboxElem.uniform();
        }
    },
    ready: function() {
        this.checkboxElem = $('input', this.$el);

        this.handleUniform();
    }
});
