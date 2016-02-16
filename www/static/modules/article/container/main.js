define('modules/article/container/main', function(require, exports, module) {

  "use strict";
  
  var Vue = require('modules/lib/vue');
  var service = require("modules/common/service");
  var marked = require("modules/lib/marked");
  
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
    template: "<button type=\"button\" class=\"btn btn-default\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Tooltip on left\">Tooltip on left</button>\r\n<button type=\"button\" class=\"btn btn-default\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Tooltip on left\">Tooltip on right</button>\r\n<div class=\"container reader-font1\">\r\n    <div class=\"article\">\r\n        <div class=\"preview\">\r\n            <div class=\"author-info\">\r\n                <a class=\"avatar\" href=\"#\">\r\n                    <img thumbnail=\"90x90\" quality=\"100\" v-attr=\"src:article.avatar\">\r\n                </a>\r\n                <span class=\"label\">\r\n                    作者{{ article_id }}\r\n                </span>\r\n                <a class=\"author-name blue-link\" href=\"#\">\r\n                    <span>\r\n                        {{ article.author }}\r\n                    </span>\r\n                </a>\r\n                <span data-toggle=\"tooltip\" data-original-title=\"最后编辑于 2015.06.21 18:49\">\r\n                    {{ article.timestamp }}\r\n                </span>\r\n                <div>\r\n                    <span>\r\n                        写了85799字\r\n                    </span>\r\n                    ，\r\n                    <span>\r\n                        被{{ article.read }}人关注\r\n                    </span>\r\n                    ，\r\n                    <span>\r\n                        获得了{{ article.like }}个喜欢\r\n                    </span>\r\n                </div>\r\n            </div>\r\n            <h1 class=\"title\">\r\n                {{ article.title }}\r\n            </h1>\r\n            <div class=\"meta-top\">\r\n                <span class=\"wordage\">\r\n                    字数5669\r\n                </span>\r\n                <span class=\"views-count\">\r\n                    阅读{{ article.read }}\r\n                </span>\r\n                <span class=\"comments-count\">\r\n                    评论{{ article.comment }}\r\n                </span>\r\n                <span class=\"likes-count\">\r\n                    喜欢{{ article.like }}\r\n                </span>\r\n            </div>\r\n           \r\n            <div class=\"show-content\" v-html=\"article.content | marked\">\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
    data: function data() {
      return {
        'article': {
          'content': ''
        },
        'article_id': '0'
      };
    },
    compiled: function compiled() {
      console.log('==', this.article_id);
      this.getArticleDetail(this.article_id);
    },
    methods: {
      getArticleDetail: function getArticleDetail(id) {
        console.log('--', id);
        var self = this;
        var article = service.getArticleDetail(id, function (article) {
          self.$data.article = article;
        });
      }
    },
    filters: {
      marked: marked
    },
    ready: function ready() {
      console.log('==3--', this.article_id);
      console.log('plugins/bootstrap/js/bootstrap.min.js');
      // console.log(__uri('/static/plugins/bootstrap/js/bootstrap.min.js'));
      //   $(function () {
      $('[data-toggle="tooltip"]').tooltip();
      // })
      // setTimeout(function() {
      //   console.log('===');
      //   $('[data-toggle="tooltip"]').tooltip()
      // }, 1000);
    }
  });

});
