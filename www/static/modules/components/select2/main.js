define('modules/components/select2/main', function(require, exports, module) {

  /**
   * 有两种，一种是ajax请求的，一种是现成的
   * 
   * 数据优先级依次是 select2-option > init-data > url
   *
   // 直接设置select2-option
   <select2 value="1">
      <select2-option title="hello1" value="1"></select2-option>
      <select2-option title="word2" value="2"></select2-option>
      <select2-option title="test3" value="3"></select2-option>
  </select2>
  
  // 增加一个数据源init-data，它是数据，相对于设置了一个初始的data，同时也支持select2-option（优先级高）
  <select2 :init-data="select2data" value="2">
      <select2-option title="test4" value="4"></select2-option>
  </select2>
  
  // 数据源
  <select2 url="/admin/user/getgroup">
      <select2-option title="test4" value="4"></select2-option>
  </select2>
  
  // ajax远程请求
  <select2 url="/admin/user/searchuser" convert="searchuser" ajax></select2>
  
  TODO 自定义format展示，可以考虑render.js中处理
   转换id和text的函数，因为每个接口返回都有可能不一样，在select2render.js中定义；如果不定义，则默认返回格式符合{errno:0,data:[{id:1,text:'1'}]}
   */
  
  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var Select2Render = require('modules/common/select2render');
  
  Vue.component('select2', {
      template: "<div v-show=\"!lazy\">\r\n    <!-- <p>Selected: {{initValue}}-{{value}}-{{initData}}-{{data}}</p> -->\r\n    <input type=\"hidden\" :name=\"name\" v-model=\"value\" style=\"width: 100%\" class=\"form-control select2\"/>\r\n    <slot></slot>\r\n</div>",
      data: function data() {
          return {
              /**
               * 当前select2的options范围，包括select2-option中数据和init-data或者url或者ajax数据的集合
               */
              data: [],
              jqSelect: undefined
          };
      },
      props: {
          /**
           * input 的name 值，必须
           */
          name: {
              type: String,
              required: true
          },
          /**
           * 初始值
           */
          value: null,
          /**
           * 初始data
           */
          initData: Array,
          /**
           * 数据来源地址
           */
          url: String,
          /**
           * 数据转换函数名，在select2render.js中定义。
           * 不同的接口返回的数据不一定相同，可以接口返回之前转换，也可以前台定义此字段来转换
           */
          convert: String,
          placeholder: {
              type: String,
              'default': '请选择'
          },
          allowClear: Boolean,
          /**
           * 是否懒渲染
           */
          lazy: Boolean,
          /**
           * 是否为ajax请求远程数据？
           */
          ajax: Boolean,
          /**
           * 是否支持可输入
           * 不支持ajax模式，如果是该模式依然需要这种功能，则建议在data中直接返回请求的数据
           */
          includeInput: Boolean
      },
      computed: {
          options: function options() {
              var result = {};
  
              result.data = this.data;
  
              if (this.allowClear) {
                  result.allowClear = true;
              }
  
              result.placeholder = this.placeholder;
  
              if (this.includeInput && !this.ajax) {
                  result.query = function (query) {
                      var data = {
                          results: []
                      };
  
                      // 必须是非空场景再增加
                      if (query.term) {
                          data.results.push({
                              id: query.term,
                              text: query.term
                          });
                      }
  
                      data.results = data.results.concat(result.data);
  
                      query.callback(data);
                  };
  
                  // TODO 此处可能还有更优化的写法，后面再修改
                  result.initSelection = function (element, callback) {
                      var initValue = element.val(),
                          initText = initValue;
  
                      $.each(result.data, function () {
                          if (this.id == initValue) {
                              initText = this.text;
                              return false;
                          }
                      });
  
                      var data = {
                          id: initValue,
                          text: initText
                      };
  
                      callback(data);
                  };
              }
  
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
              if (!this.ajax) {
                  this._initLocal();
              } else {
                  this._initAjax();
              }
          },
          /**
           * 对外广播：select2值发生了变化
           */
          reportChange: function reportChange(name, val, oldVal) {
              this.$dispatch('valuechange', name, val, oldVal);
          },
          _initLocal: function _initLocal() {
              // 调用Init之后，要将lazy标志给取消，否则他将被隐藏
              this.lazy = false;
  
              // 初始化前要先销毁原来的那个
              this.destroy();
  
              // 获得data，如果有select2-option，则追加到data字段中，并且具有较高优先级
              var select2options = this.$children,
                  data = select2options.map(function (item) {
                  return {
                      id: item.value,
                      text: item.title
                  };
              });
  
              // 来自init-data的数据
              if (this.initData && Array.isArray(this.initData)) {
                  data = data.concat(this.initData);
              }
  
              // 来自url的请求数据
              var self = this;
  
              if (this.url) {
                  $.post(this.url, function (res, status) {
                      // 如果定义了convert函数，则使用它处理，否则默认判断res.errno==0和获取res.data
                      if (self.convert && typeof Select2Render[self.convert] === "function") {
                          data = data.concat(Select2Render[self.convert](res));
                      } else if (res.errno === 0) {
                          data = data.concat(res.data);
                      }
  
                      self.data = data;
                      self._renderSelect2();
                  });
              } else {
                  this.data = data;
                  this._renderSelect2();
              }
          },
          _initAjax: function _initAjax() {
              // 调用Init之后，要将lazy标志给取消，否则他将被隐藏
              this.lazy = false;
  
              // 初始化前要先销毁原来的那个
              this.destroy();
  
              if (!this.url) {
                  console.error('ajax bug url is undefined');
                  return;
              }
  
              var self = this;
  
              // 最少得一个字符
              this.options.minimumInputLength = 1;
  
              this.options.ajax = {
                  url: this.url,
                  dataType: 'json',
                  quietMillis: 250, //过多久才去搜索，避免请求过快
                  data: function data(term, page) {
                      return {
                          q: term };
                  },
                  // search term
                  results: function results(data, page) {
                      // parse the results into the format expected by Select2.
                      // since we are using custom formatting functions we do not need to alter the remote JSON data
  
                      var resultsData = [];
  
                      // 如果定义了convert函数，则使用它处理，否则默认判断res.errno==0和获取res.data
                      if (self.convert && typeof Select2Render[self.convert] === "function") {
                          resultsData = Select2Render[self.convert](data);
                      } else if (data.errno === 0) {
                          resultsData = data.data;
                      }
  
                      return {
                          results: resultsData
                      };
                  },
                  cache: true
              };
  
              this._renderSelect2();
          },
          _renderSelect2: function _renderSelect2() {
              // select2
              var self = this,
                  options = this.options,
                  jqSelect = $('input', this.$el).select2(options);
  
              this.jqSelect = jqSelect;
  
              // 设置默认值，此处可以不再手动调用
              // if (this.value) {
              //     this.jqSelect.val(this.value).trigger('change');
              // }
          }
      },
      watch: {
          /**
           * 当初始data值变化了时，重新渲染select2
           */
          'initData': {
              handler: function handler(val, oldVal) {
                  this.init();
              },
              deep: true
          },
  
          /**
           * 由于在input中设置了v-model="vaule"，因此value值会双向绑定
           * 此处检测value变化了，则将input的值进行切换。
           */
          'value': function value(val, oldVal) {
              if (this.jqSelect) {
                  // 触发select2的控件中选项的选择
                  this.jqSelect.val(this.value).trigger('change');
  
                  // 冒泡一个事件，通知值发生了变化，主要是为了解决jquery validate 和 select2 的问题 http://fanshuyao.iteye.com/blog/2243544                 
                  this.reportChange(this.name, val, oldVal);
              }
          }
      },
      ready: function ready() {
          // 如果不是lazy模式，则立即渲染
          if (!this.lazy) {
              this.init();
          }
      }
  });

});
