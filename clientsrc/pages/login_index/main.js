/**
 * Boot up the Vue instance and wire up the router.
 */

require('common/global');

var Vue = require('lib/vue');

var LoginHeader = require('./modules/header/main');
var LoginFooter = require('./modules/footer/main');
var LoginContainer = require('./modules/container/main');
var LoginPanel = require('./modules/loginpanel/main');

window.app = new Vue({
    el: '#app',
    components: {
        LoginHeader,
        LoginContainer,
        LoginFooter,
        LoginPanel
    }
});

// TODO html中的样式由js来控制
/**
    <!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
    <!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
    <!--[if !IE]><!-->
    <html lang="en" class="no-js">
    <!--<![endif]-->
 */
