define('modules/user_index/modify/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var validator = require('modules/common/validator');
  var Msg = require('modules/components/msg/main');
  
  module.exports = Vue.extend({
      template: "<div class=\"modifypage\">\r\n    <modal title=\"修改用户信息\" v-on:confirm=\"saveSubmit\">\r\n        <he-form action=\"/admin/user/modify\" horizontal noactions>\r\n            <he-form-item title=\"ID\" horizontal>\r\n                <input type=\"text\" name=\"id\" v-model=\"id\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"用户名\" horizontal>\r\n                <input type=\"text\" name=\"name\" v-model=\"name\" readonly>\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"生日\" horizontal>\r\n                <date name=\"birthday\" :value.sync=\"birthday\"></date>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: function data() {
          return {
              jqForm: undefined,
              id: undefined,
              name: undefined,
              state: undefined,
              birthday: undefined
          };
      },
      methods: {
          showModal: function showModal(data) {
              this.id = data.id;
              this.name = data.name;
              this.state = data.state;
              this.birthday = data.birthday;
  
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
          handleValidator: function handleValidator() {
              var self = this;
  
              validator.check(this.jqForm, {
                  name: {
                      required: {
                          rule: true,
                          message: '用户名不能为空！'
                      },
                      minlength: {
                          rule: 3,
                          message: '最小长度为3'
                      },
                      maxlength: {
                          rule: 64,
                          message: '最大长度为64'
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
                                  self.hideModal();
  
                                  // 刷新列表
                                  self.reportSuccess(responseText.data);
                              }
                          }
                      });
                  }
              });
          }
      },
      ready: function ready() {
          this.jqForm = $('form', this.$el);
  
          this.handleValidator();
      }
  });

});
