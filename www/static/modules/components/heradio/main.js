define('modules/components/heradio/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('he-radio', {
      template: "<label class=\"radio\">\r\n    <input type=\"radio\" name=\"{{ name }}\" v-model=\"checked\" /> \r\n    {{ title }} \r\n</label>\r\n\r\n<!-- <label>\r\n<input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios22\" value=\"option1\" checked> Option 1 </label>\r\n -->\r\n\r\n<!-- <label class=\"radio-inline\">\r\n<input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios25\" value=\"option1\" checked> Option 1 </label> -->",
      data: function data() {
          return {
              radioElem: undefined
          };
      },
      props: {
          /**
           * radio 的 name 值，必须
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
  
              this.radioElem.uniform();
          }
      },
      ready: function ready() {
          this.radioElem = $('input', this.$el);
  
          this.handleUniform();
      }
  });

});
