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
            .select2({
                data: this.params.options
            })
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
    data: function() {
        return {
            selected: 1,
            options: [{
                id: 1,
                text: 'hello'
            }, {
                id: 2,
                text: 'what'
            }]
        };
    },
    ready: function() {

    }
});
