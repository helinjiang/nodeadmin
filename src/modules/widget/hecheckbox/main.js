var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
    data: function() {
        return {
            checkboxElem: undefined
        }
    },
    props: [
        'value',


        /**
         * 字段的解释，非必须，会自动生成类似<label class="control-label">用户名</label>
         */
        'title',


        /**
         * input 的name 值，必须
         */
        'name'
    ],
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
        // 缓存该值，避免重复获取
        this.$set('checkboxElem', $('input', $(this.$el)));

        handleUniform(this);
    }
});


var handleUniform = function(vm) {
    if (!jQuery().uniform) {
        return;
    }

    vm.checkboxElem.uniform();
}
