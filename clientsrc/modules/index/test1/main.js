var Vue = require('lib/vue');

module.exports = Vue.extend({
  data: function() {
    return {
      msg: "hello, i am test1"
    }
  },
  template: __inline('main.html')
});
