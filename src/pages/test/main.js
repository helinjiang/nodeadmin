/**
 * Boot up the Vue instance and wire up the router.
 */

require('common/global');

var Vue = require('lib/vue');

var App = require('/modules/common/app');
var TestMain = require('/modules/test/main/main');

window.app = new Vue({
    el: '#app',
    components: {
        TestMain
    },
    ready: function() {
        _init();

        // console.log('==',location.href);

        // 设置菜单，这里也可以设置为自动获取当前的url，然后匹配导航
        this.$refs['main'].setMenu('test.html');
        this.$refs['main'].setTitle();
    }
});


function _init() {
    $(function() {
        App.init();
    });
}
