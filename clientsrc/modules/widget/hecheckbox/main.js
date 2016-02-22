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
        value: String,
        title: String,
    },
    methods: {
        isChecked: function() {
            return this.checkboxElem.attr('checked') === 'checked';
        },
        getVal: function() {
            if (this.isChecked()) {
                return this.checkboxElem.val();
            }
        }
    },
    ready: function() {
        this.checkboxElem = $('input', $(this.$el));

        handleUniform(this);
    }
});


function handleUniform(vm) {
    if (!jQuery().uniform) {
        return;
    }

    vm.checkboxElem.uniform();
}
