define('modules/components/hecheckbox/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('he-checkbox', {
      template: "<label class=\"checkbox\">\r\n    <input type=\"checkbox\" name=\"{{ name }}\" value=\"{{ value }}\" /> \r\n    {{ title }} \r\n</label>",
      data: function data() {
          return {
              checkboxElem: undefined
          };
      },
      props: {
          /**
           * checkbox 的 name 值，必须
           */
          name: {
              type: String,
              required: true
          },
          value: String,
          title: String
      },
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
          this.checkboxElem = $('input', $(this.$el));
  
          handleUniform(this);
      }
  });
  
  function handleUniform(vm) {
      if (!jQuery().uniform) {
          return;
      }
  
      vm.checkboxElem.uniform();
  }

});
