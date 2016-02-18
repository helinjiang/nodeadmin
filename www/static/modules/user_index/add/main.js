define('modules/user_index/add/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var validator = require('modules/common/validator');
  
  module.exports = Vue.extend({
      template: "<div class=\"addpage\">\r\n\r\n    <button class=\"btn btn-success\" v-on:click=\"showModal\">\r\n        新增 <i class=\"fa fa-plus\"></i>    \r\n    </button>\r\n\r\n    <modal title=\"新增用户信息\" v-on:confirm=\"save\">\r\n\r\n        <form action=\"#\" class=\"form-horizontal\" role=\"form\">\r\n            <div class=\"form-body\">\r\n                <form-input name=\"name\" title=\"用户名\" horizontal></form-input>\r\n                <form-input type=\"password\" name=\"pwd\" title=\"密码\" horizontal></form-input>\r\n            </div>\r\n        </form>\r\n        \r\n    </modal>\r\n\r\n</div>\r\n",
      data: function data() {
          return {
              jqForm: undefined
          };
      },
      methods: {
          showModal: function showModal() {
              this.$children[0].show();
          },
          save: function save(msg) {
              console.log('next to save add', msg);
              // console.log(this.jqForm);
              this.jqForm.submit();
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
  
          // handleEnter(vm);
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
          },
          pwd: {
              required: {
                  rule: true,
                  message: '密码不能为空！'
              },
              minlength: {
                  rule: 2,
                  message: '最小长度为6'
              }
          }
      }, {
          invalidHandler: function invalidHandler(event, validator) {
              // vm.$refs.alert.show('登录失败，请输入正确的用户名和密码！');
          },
          submitHandler: function submitHandler(form) {
              $(form).ajaxSubmit({
                  success: function success(responseText, statusText) {
                      console.log(responseText, statusText);
                      // if (statusText !== 'success' || responseText.errno !== 0) {
                      //     vm.$refs.alert.show('登录失败，请输入正确的用户名和密码！');
                      // } else {
                      //     vm.$refs.alert.hide();
                      //     // 加载中...
                      //     // 跳转到主页面
                      //     window.location.href = '/admin/';
                      // }
                  }
              });
          }
      });
  }

});
