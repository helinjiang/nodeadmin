var Vue = require('lib/vue');
var service = require("common/service.js");
var marked = require("lib/marked.js");

require("lib/bootstrap/js/bootstrap.min");

// 这种方式的样式可能会导致无法被覆盖，因为它会被追加到自定义css的后面
// require.loadCss({
//   'url': 'http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css'
// });

// require.loadCss({
//   'url': 'plugins/bootstrap/css/bootstrap.css'
// });


// 可自行设置进去，替换特定的标签位置，这样就能够避免问题。但也可以一起打包，因为一般的插件css会很少的

// console.log(__uri('plugins/bootstrap/js/bootstrap.min.js'));
// var oHead = document.getElementsByTagName('head').item(0);
// var oScript = document.createElement('script');
// oScript.src = __uri('plugins/bootstrap/js/bootstrap.min.js');
// oHead.appendChild(oScript);

module.exports = Vue.extend({
  inherit: true, //集成父元素所有属性
  template: __inline('main.html'),
  data: function() {
    return {
      'article': {
        'content': ''
      },
      'article_id': '0'
    }
  },
  compiled: function() {
    console.log('==', this.article_id);
    this.getArticleDetail(this.article_id);
  },
  methods: {
    getArticleDetail: function(id) {
      console.log('--', id);
      var self = this;
      var article = service.getArticleDetail(id, function(article) {
        self.$data.article = article;
      })
    }
  },
  filters: {
    marked: marked
  },
  ready: function() {
    console.log('==3--', this.article_id);
    console.log(__uri('plugins/bootstrap/js/bootstrap.min.js'));
    // console.log(__uri('/static/plugins/bootstrap/js/bootstrap.min.js'));
  //   $(function () {
  $('[data-toggle="tooltip"]').tooltip()
// })
    // setTimeout(function() {
    //   console.log('===');
    //   $('[data-toggle="tooltip"]').tooltip()
    // }, 1000);
  }
});
