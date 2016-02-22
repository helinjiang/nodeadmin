define('modules/car_index/add/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var validator = require('modules/common/validator');
  var Msg = require('modules/widget/msg/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"addpage\">\r\n    <button class=\"btn btn-success\" v-on:click=\"showModal\">\r\n        新增 <i class=\"fa fa-plus\"></i>\r\n    </button>\r\n    <modal title=\"新增用户信息\" v-on:confirm=\"saveSubmit\">\r\n        <he-form action=\"/admin/car/save\" horizontal noactions>\r\n            <he-form-item title=\"汽车名\" horizontal>\r\n                <input type=\"text\" name=\"name\">\r\n            </he-form-item>\r\n            <he-form-item title=\"车主人\" horizontal>\r\n                <select2 name=\"ownerId\" url=\"/admin/user/getdata\" convert=\"searchuser\"  v-on:select2change=\"checkOwnerId\" lazy v-ref:user></select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" horizontal>\r\n                <select2 name=\"state\" value=\"1\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"购买日期\" horizontal>\r\n                <date name=\"buydate\" value=\"2015-12-12\"></date>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: function data() {
          return {
              jqForm: undefined
          };
      },
      methods: {
          showModal: function showModal() {
              this._reset();
              this.$refs.user.init();
  
              this.$children[0].show();
          },
          hideModal: function hideModal() {
              this.$children[0].hide();
          },
          reportSuccess: function reportSuccess(data) {
              this.$dispatch('savesuccess', data);
          },
          saveSubmit: function saveSubmit(msg) {
              // 提交表单
              this.jqForm.submit();
          },
          checkOwnerId: function checkOwnerId(name) {
              this.jqForm.valid();
          },
          _reset: function _reset() {
              // TODO select2 的初始化
              $('[name="name"]', this.jqForm).val('');
          }
      },
      ready: function ready() {
          // 缓存该值，避免重复获取
          this.$set('jqForm', $('form', $(this.$el)));
  
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
                  message: '汽车名字不能为空！'
              }
          },
          ownerId: {
              required: {
                  rule: true,
                  message: '车主人不能为空！'
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
