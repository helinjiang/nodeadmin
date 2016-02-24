define('modules/user_index/add/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  var validator = require('modules/common/validator');
  var Msg = require('modules/components/msg/main');
  
  /**
   * 初始默认值
   */
  var defaultData = {
      name: '',
      pwd: '',
      birthday: '2015-12-12',
      state: '1'
  };
  
  module.exports = Vue.extend({
      template: "<div class=\"addpage\">\r\n    <button class=\"btn btn-success\" v-on:click=\"showModal\">\r\n        新增 <i class=\"fa fa-plus\"></i>\r\n    </button>\r\n    <modal title=\"新增用户信息\" v-on:confirm=\"saveSubmit\">\r\n        <he-form action=\"/admin/user/add\" horizontal noactions>\r\n            <he-form-item title=\"用户名\" horizontal>\r\n                <input type=\"text\" name=\"name\" v-model=\"name\">\r\n            </he-form-item>\r\n            <he-form-item title=\"密码\" horizontal>\r\n                <input type=\"password\" name=\"pwd\" v-model=\"pwd\">\r\n            </he-form-item>\r\n            <he-form-item title=\"状态\" horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"生日\" horizontal>\r\n                <date name=\"birthday\" :value.sync=\"birthday\"></date>\r\n            </he-form-item>\r\n        </he-form>\r\n    </modal>\r\n</div>\r\n",
      data: function data() {
          return {
              jqForm: undefined,
              name: defaultData.name,
              pwd: defaultData.pwd,
              birthday: defaultData.birthday,
              state: defaultData.state
          };
      },
      methods: {
          showModal: function showModal() {
              // 打开对话框时，一定要记得清空上一次填写的记录
              this.name = defaultData.name;
              this.pwd = defaultData.pwd;
              this.birthday = defaultData.birthday;
              this.state = defaultData.state;
  
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
                  },
                  pwd: {
                      required: {
                          rule: true,
                          message: '密码不能为空！'
                      },
                      minlength: {
                          rule: 6,
                          message: '最小长度为6'
                      },
                      maxlength: {
                          rule: 32,
                          message: '最大长度为32'
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
