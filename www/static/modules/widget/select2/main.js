define('modules/widget/select2/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.directive('select', {
      twoWay: true,
      priority: 1000,
  
      params: ['options'],
  
      bind: function bind() {
          var self = this;
          $(this.el).select2({
              data: this.params.options
          }).on('change', function () {
              self.set(this.value);
          });
      },
      update: function update(value) {
          $(this.el).val(value).trigger('change');
      },
      unbind: function unbind() {
          $(this.el).off().select2('destroy');
      }
  });
  
  Vue.component('select2', {
      template: "<div>\r\n  <p>Selected: {{selected}}</p>\r\n  <select v-select=\"selected\" :options=\"options\" style=\"width: 100%\">\r\n    <option value=\"0\">default</option>\r\n  </select>\r\n</div>",
      data: function data() {
          return {
              selected: 0,
              options: [{
                  id: 1,
                  text: 'hello'
              }, {
                  id: 2,
                  text: 'what'
              }]
          };
      },
      ready: function ready() {}
  });

});
