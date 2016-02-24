define('modules/car_index/modify/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  //Vue.config.debug = true;
  
  var validator = require('modules/common/validator');
  var Msg = require('modules/components/msg/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"modifypage\">\r\n    <modal title=\"修改用户信息\" v-on:confirm=\"saveSubmit\">        \r\n        <he-form action=\"/admin/car/save\" horizontal noactions>\r\n            <he-form-item title=\"ID\" horizontal>\r\n                <input type=\"text\" name=\"id\" :value=\"item.id\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"汽车名\" horizontal>\r\n                <input type=\"text\" name=\"name\" :value=\"item.name\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"车主人\" horizontal>\r\n                <select2 name=\"ownerId\" url=\"/admin/user/getdata\" convert=\"searchuser\" lazy :value=\"item.ownerId\" v-on:select2change=\"checkOwnerId\"  v-ref:user></select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" horizontal>\r\n                <select2 name=\"state\" :value=\"item.state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"购买日期\" horizontal>\r\n                <date name=\"buydate\" :value=\"item.buydate\"></date><!--TODO type check failed for value=\"item.buydate\". Expected String, got Undefined.-->\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: function data() {
          return {
              jqForm: undefined,
              item: undefined
          };
      },
      methods: {
          showModal: function showModal(data) {
  
              this.item = data;
  
              this.$refs.user.init();
  
              this.$children[0].show();
          },
          hideModal: function hideModal() {
              this.$children[0].hide();
          },
          reportSuccess: function reportSuccess(data) {
              this.$dispatch('savesuccess', data);
          },
          checkOwnerId: function checkOwnerId(name) {
              this.jqForm.valid();
          },
          saveSubmit: function saveSubmit(msg) {
              // 提交表单
              this.jqForm.submit();
          }
      },
      ready: function ready() {
          // 缓存该值，避免重复获取
          this.jqForm = $('form', $(this.$el));
  
          _init(this);
      }
  });
  
  function _init(vm) {
      $(function () {
          handleValidator(vm);
      });
  }
  
  function handleValidator(vm) {
      validator.check(vm.jqForm, {
          name: {
              required: {
                  rule: true,
                  message: '用户名不能为空！'
              },
              minlength: {
                  rule: 2,
                  message: '最小长度为2'
              },
              maxlength: {
                  rule: 6,
                  message: '最大长度为6'
              }
          }
      }, {
          submitHandler: function submitHandler(form) {
              $(form).ajaxSubmit({
                  success: function success(responseText, statusText) {
                      if (statusText !== 'success' || responseText.errno !== 0) {
                          // 提示失败
                          Msg.error('保存' + JSON.stringify(responseText.data) + '出错！');
                      } else {
                          // 提示成功
                          Msg.success('保存' + JSON.stringify(responseText.data) + '成功！');
  
                          // 关闭对话框
                          vm.hideModal();
  
                          // 刷新列表
                          vm.reportSuccess(responseText.data);
                      }
                  }
              });
          }
      });
  }

});
