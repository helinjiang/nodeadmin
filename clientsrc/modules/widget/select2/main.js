/**
 * 有两种，一种是ajax请求的，一种是现成的
 */

var Vue = require('lib/vue');

Vue.directive('select', {
    twoWay: true,
    priority: 1000,

    params: ['options'],

    bind: function() {
        var self = this;
        $(this.el)
            .select2(this.params.options)
            .on('change', function() {
                self.set(this.value);
            });
    },
    update: function(value) {
        $(this.el).val(value).trigger('change');
    },
    unbind: function() {
        $(this.el).off().select2('destroy');
    }
});


Vue.component('select2', {
    template: __inline('main.html'),
    props: {
        /**
         * 初始值
         */
        value: null,
        placeholder: {
            type: String,
            'default': '请选择'
        },
        allowClear: {
            type: Boolean,
            'default': false
        }
    },
    computed: {
        options: function() {
            var result = {},
                data;

            // 如果有select2-option，则追加到data字段中
            var select2options = this.$children;
            data = select2options.map(function(item) {
                return {
                    id: item.value,
                    text: item.title
                }
            });

            result.data = data;

            // result.data = [{
            //     id: 1,
            //     text: 'hello'
            // }, {
            //     id: 2,
            //     text: 'world'
            // }, {
            //     id: 3,
            //     text: 'what'
            // }];

            if (this.allowClear) {
                result.allowClear = true;
            }

            result.placeholder = this.placeholder;
            console.log(result);

            return result;
        }
    },
    ready: function() {

    }
});
