var Vue = require('lib/vue');
var Test2 = require('/modules/index/test2/main');

module.exports = Vue.extend({
  data: function() {
    return {
      msg: "hello, i am test3"
    }
  },
  template: __inline('main.html'),
  components: {
    'test2': Test2,
  }
});
