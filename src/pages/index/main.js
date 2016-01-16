/**
 * Boot up the Vue instance and wire up the router.
 */

var Vue = require('lib/vue');

var IndexTest1 = require('/modules/index/test1/main');
var IndexTest2 = require('/modules/index/test2/main');
var IndexTest3 = require('/modules/index/test3/main');

window.app = new Vue({
  el: '#app',
  data: {
    'currentView': 'index.html'
  },
  components: {
    'index-test1': IndexTest1,
    'test2': IndexTest2,
    'test3': IndexTest3,
  }
});
