/**
 * Boot up the Vue instance and wire up the router.
 */

var Vue = require('lib/vue');

var Container = require('/modules/article/container/main');

window.app = new Vue({
  el: '#app',
  components: {
    Container
  },
  ready: function(){
    var child = this.$refs.mycon;
    // console.log(child);
    child.getArticleDetail('a10');
  }
});
