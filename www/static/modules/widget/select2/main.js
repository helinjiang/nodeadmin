define('modules/widget/select2/main', function(require, exports, module) {

  /**
   * 有两种，一种是ajax请求的，一种是现成的
   */
  
  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('select2', {
      template: "<div>\r\n    <p>Selected: {{value}}</p>\r\n    <input type=\"hidden\" style=\"width: 100%\" />\r\n    <slot></slot>\r\n</div>\r\n",
      data: function data() {
          return {
              data: [],
              jqSelect: undefined
          };
      },
      props: {
          /**
           * 初始值
           */
          value: null,
          /**
           * 数据来源地址
           */
          url: String,
          placeholder: {
              type: String,
              'default': '请选择'
          },
          allowClear: {
              type: Boolean,
              'default': false
          }
      },
      computed: {
          options: function options() {
              var result = {};
  
              result.data = this.data;
  
              if (this.allowClear) {
                  result.allowClear = true;
              }
  
              result.placeholder = this.placeholder;
  
              return result;
          }
      },
      methods: {
          /**
           * 销毁select2
           */
          destroy: function destroy() {
              if (this.jqSelect) {
                  this.jqSelect.off().select2('destroy');
                  this.jqSelect = undefined;
              }
          },
          init: function init() {
              // 初始化前要先销毁原来的那个
              this.destroy();
  
              // 获得data，如果有select2-option，则追加到data字段中
              var select2options = this.$children,
                  data = select2options.map(function (item) {
                  return {
                      id: item.value,
                      text: item.title
                  };
              });
  
              this.data = data;
  
              // select2
              var self = this,
                  options = this.options,
                  jqSelect = $('input', this.$el).select2(options).on('change', function () {
                  self.value = this.value;
              });
  
              this.jqSelect = jqSelect;
  
              // 设置默认值
              if (this.value) {
                  this.jqSelect.val(this.value).trigger('change');
              }
          }
      },
      ready: function ready() {
          this.init();
      }
  });
  
  // newData = [{
  //     id: 1,
  //     text: 'hello'
  // }, {
  //     id: 2,
  //     text: 'world'
  // }, {
  //     id: 3,
  //     text: 'what'
  // }];

});
