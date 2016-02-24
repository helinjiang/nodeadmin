define('modules/components/inputtext/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
    template: "<div class=\"form-group\">\r\n    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->\r\n    <label class=\"control-label visible-ie8 visible-ie9\" v-if=\"!notitle\">{{ title }}</label>\r\n    <div class=\"input-icon\">\r\n        <i class=\"fa fa-{{ icon }}\" v-if=\"icon\"></i>\r\n        <input class=\"form-control placeholder-no-fix\" type=\"text\" autocomplete=\"off\" placeholder=\"{{ title }}\" name=\"{{ name }}\" />\r\n    </div>\r\n</div>\r\n",
    data: function data() {
      return {
        isShow: false,
        type: 'danger', //danger,info,success,warning
        msg: '' //必填
      };
    },
    props: [
    /**
     *是否使用icon，非必须，在输入框前面显示图标，会自动生成类似<i class="fa fa-user"></i>，其中的icon就是user
     * user: 用户名
     */
    'icon',
  
    /**
     * 字段的解释，非必须，会自动生成类似<label class="control-label">用户名</label>
     */
    'title',
  
    /**
     * 是否显示title，非必须，默认显示，即显示<lable>
     */
    'notitle',
  
    /**
     * input 的name 值，必须
     */
    'name']
  });

});
