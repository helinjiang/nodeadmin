define('modules/components/hecheckbox - 副本/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('he-checkbox', {
      template: "<label class=\"checkbox\">\r\n    <input type=\"checkbox\" name=\"{{ name }}\" v-model=\"checked\" /> \r\n    {{ title }} \r\n</label>",
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
          checked: Boolean,
          title: String
      },
      watch: {
          /**
           * 此处一定要注意，当checked值变化时，要重新uniform一下，否则会不渲染
           */
          checked: function checked(val, oldVal) {
              this.handleUniform();
          }
      },
      methods: {
          isChecked: function isChecked() {
              return checked;
          },
          handleUniform: function handleUniform() {
              if (!jQuery().uniform) {
                  return;
              }
  
              this.checkboxElem.uniform();
          }
      },
      ready: function ready() {
          this.checkboxElem = $('input', this.$el);
  
          this.handleUniform();
      }
  });

});
