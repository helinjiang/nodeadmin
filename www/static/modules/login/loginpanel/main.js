define('modules/login/loginpanel/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  var validator = require('modules/common/validator');
  
  var FormActions = require('modules/widget/formactions/main');
  var HeCheckbox = require('modules/widget/hecheckbox/main');
  
  module.exports = Vue.extend({
      template: "<form class=\"login-form\" action=\"./login/login\" method=\"post\">\r\n    <h3 class=\"form-title\">欢迎登录</h3>\r\n    \r\n    <tip-alert v-ref:alert></tip-alert>\r\n\r\n    <form-input name=\"username\" title=\"用户名\" icon=\"user\"></form-input>\r\n    <form-input type=\"password\" name=\"password\" title=\"密码\" icon=\"lock\"></form-input>\r\n\r\n    <form-actions>\r\n        <he-checkbox name=\"remember\" title=\"记住密码\" value=\"1\"></he-checkbox>\r\n        <button type=\"submit\" class=\"btn btn-info pull-right\"> 登录 </button>\r\n    </form-actions>\r\n\r\n</form>",
      data: function data() {
          return {
              jqForm: undefined
          };
      },
      components: {
          FormActions: FormActions,
          HeCheckbox: HeCheckbox
      },
      ready: function ready() {
          // 缓存该值，避免重复获取
          this.$set('jqForm', $(this.$el));
  
          _init(this);
      }
  });
  
  function _init(vm) {
      $(function () {
  
          handleValidator(vm);
  
          handleEnter(vm);
      });
  }
  
  function handleValidator(vm) {
      validator.check(vm.jqForm, {
          username: {
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
          },
          password: {
              required: {
                  rule: true,
                  message: '密码不能为空！'
              },
              minlength: {
                  rule: 6,
                  message: '最小长度为6'
              }
          }
      }, {
          invalidHandler: function invalidHandler(event, validator) {
              vm.$refs.alert.show('登录失败，请输入正确的用户名和密码！');
          },
          submitHandler: function submitHandler(form) {
              $(form).ajaxSubmit({
                  success: function success(responseText, statusText) {
                      console.log(responseText, statusText);
                      if (statusText !== 'success' || responseText.errno !== 0) {
                          vm.$refs.alert.show('内部错误！');
                      } else {
                          vm.$refs.alert.hide();
                          console.log('success,ready to index');
                          // 加载中...
                          // 跳转到主页面
                      }
                  }
              });
          }
      });
  }
  
  function handleEnter(vm) {
      $('input', vm.jqForm).keypress(function (e) {
          if (e.which == 13) {
              if (vm.jqForm.validate().form()) {
                  vm.jqForm.submit();
              }
              return false;
          }
      });
  }

});
