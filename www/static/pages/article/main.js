define('pages/article/main', function(require, exports, module) {

  /**
   * Boot up the Vue instance and wire up the router.
   */
  
  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var Container = require('modules/article/container/main');
  
  window.app = new Vue({
    el: '#app',
    components: {
      Container: Container
    },
    ready: function ready() {
      var child = this.$refs.mycon;
      // console.log(child);
      child.getArticleDetail('a10');
    }
  });

});
