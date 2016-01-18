var Vue = require('lib/vue');

module.exports = Vue.extend({
    template: __inline('main.html'),
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
    ]
});


var handleUniform = function() {
    if (!jQuery().uniform) {
        return;
    }
    var test = $("input[type=checkbox]:not(.toggle, .make-switch), input[type=radio]:not(.toggle, .star, .make-switch)");
    if (test.size() > 0) {
        test.each(function() {
            if ($(this).parents(".checker").size() == 0) {
                $(this).show();
                $(this).uniform();
            }
        });
    }
}
