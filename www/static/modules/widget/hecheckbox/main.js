define('modules/widget/hecheckbox/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<label class=\"checkbox\">\r\n    <input type=\"checkbox\" name=\"{{ name }}\" value=\"{{ value }}\" /> \r\n    {{ title }} \r\n</label>",
      data: function data() {
          return {
              checkboxElem: undefined
          };
      },
      props: ['value',
  
      /**
       * 字段的解释，非必须，会自动生成类似<label class="control-label">用户名</label>
       */
      'title',
  
      /**
       * input 的name 值，必须
       */
      'name'],
      methods: {
          isChecked: function isChecked() {
              return this.checkboxElem.attr('checked') === 'checked';
          },
          getVal: function getVal() {
              if (this.isChecked()) {
                  return this.checkboxElem.val();
              }
          }
      },
      ready: function ready() {
          // 缓存该值，避免重复获取
          this.$set('checkboxElem', $('input', $(this.$el)));
  
          handleUniform(this);
      }
  });
  
  var handleUniform = function handleUniform(vm) {
      if (!jQuery().uniform) {
          return;
      }
  
      vm.checkboxElem.uniform();
  };

});
