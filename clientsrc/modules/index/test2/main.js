var Vue = require('lib/vue');

module.exports = Vue.extend({
  data: function() {
    return {
      msg: "hello, i am test2"
    }
  },
  props: ['msg2'],
  template: __inline('main.html')
});
