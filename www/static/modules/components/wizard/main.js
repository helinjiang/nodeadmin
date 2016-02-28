define('modules/components/wizard/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  var App = require('modules/common/app');
  var Validator = require('modules/common/validator');
  
  var WizardTitle = require('modules/components/wizard/title/main');
  var WizardSteps = require('modules/components/wizard/steps/main');
  var WizardProgress = require('modules/components/wizard/progress/main');
  var WizardTabContent = require('modules/components/wizard/tabcontent/main');
  var WizardActions = require('modules/components/wizard/actions/main');
  
  var MSG_SUCCESS = 'TEST: Your form validation is successful!';
  var MSG_ERROR = 'TEST: You have some form errors. Please check below.';
  
  Vue.component('wizard', {
      template: "<div class=\"wizard\">\r\n    <portlet :title=\"title\" icon=\"reorder\" id=\"form_wizard_1\" bodycss=\"form\"> \r\n        <wizard-title slot=\"title\" :value=\"stepTitle\"></wizard-title>\r\n\r\n        <he-form id=\"submit_form\" inner=\"form-wizard\" actionscss=\"fluid\" horizontal>\r\n\r\n            <wizard-steps :index=\"stepIndex\" :items=\"stepItems\"></wizard-steps>\r\n            <wizard-progress :index=\"stepIndex\" :total=\"stepTotal\"></wizard-progress>\r\n\r\n            <wizard-tab-content>            \r\n                <tip-alert :type=\"msgType\" :msg=\"msgContent\" :hide=\"msgHide\"></tip-alert>\r\n\r\n                <slot></slot>                \r\n                \r\n            </wizard-tab-content>\r\n           \r\n            <wizard-actions slot=\"actions\" :index=\"stepIndex\" :total=\"stepTotal\"></wizard-actions>\r\n        </he-form>\r\n    </portlet>   \r\n</div>",
      components: {
          WizardTitle: WizardTitle,
          WizardSteps: WizardSteps,
          WizardProgress: WizardProgress,
          WizardTabContent: WizardTabContent,
          WizardActions: WizardActions
      },
      data: function data() {
          return {
              jqForm: undefined,
              stepIndex: 0,
              msgContent: '',
              msgType: '',
              msgHide: true
          };
      },
      computed: {
          /**
           * 一共有几个步骤
           */
          stepTotal: function stepTotal() {
              return this.stepItems.length;
          },
          /**
           * 在导航中显示的进度文字
           */
          stepTitle: function stepTitle() {
              return ' - Step ' + (this.stepIndex + 1) + ' of ' + this.stepTotal;
          }
      },
      props: {
          title: String,
          stepItems: {
              type: Array,
              required: true
          },
          rulesOptions: Object
      },
      methods: {
          showError: function showError(msg) {
              this.msgContent = msg || MSG_ERROR;
              this.msgType = 'danger';
              this.msgHide = false;
          },
          showSuccess: function showSuccess(msg) {
              this.msgContent = msg || MSG_SUCCESS;
              this.msgType = 'success';
              this.msgHide = false;
          },
          clearMsg: function clearMsg() {
              this.msgHide = true;
          },
          handleValidator: function handleValidator() {
              var self = this,
                  form = this.jqForm;
  
              Validator.check(this.jqForm, this.rulesOptions, {
                  doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                  ignore: ':hidden',
  
                  invalidHandler: function invalidHandler(event, validator) {
                      //display error alert on form submit  
                      self.showError(MSG_ERROR);
  
                      App.scrollTo($('.alert-danger', form), -200);
                  },
  
                  success: function success(label) {
                      label.addClass('valid') // mark the current input as valid and display OK icon
                      .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                  },
  
                  submitHandler: function submitHandler(form) {
                      self.showSuccess(MSG_SUCCESS);
                      //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                  }
              });
          },
          handleWizard: function handleWizard() {
              if (!jQuery().bootstrapWizard) {
                  return;
              }
  
              var self = this,
                  form = this.jqForm;
  
              var handleTitle = function handleTitle(tab, navigation, index) {
                  self.stepIndex = index;
  
                  App.scrollTo($('.page-title'));
              };
  
              $(this.$el).bootstrapWizard({
                  'nextSelector': '.button-next',
                  'previousSelector': '.button-previous',
                  onTabClick: function onTabClick(tab, navigation, index, clickedIndex) {
                      self.clearMsg();
  
                      if (form.valid() == false) {
                          return false;
                      }
  
                      handleTitle(tab, navigation, clickedIndex);
                  },
                  onNext: function onNext(tab, navigation, index) {
                      self.clearMsg();
  
                      if (form.valid() == false) {
                          return false;
                      }
  
                      handleTitle(tab, navigation, index);
                  },
                  onPrevious: function onPrevious(tab, navigation, index) {
                      self.clearMsg();
  
                      handleTitle(tab, navigation, index);
                  },
                  onTabShow: function onTabShow(tab, navigation, index) {
                      self.index = index;
                  }
              });
          }
      },
      ready: function ready() {
          this.jqForm = $('form', this.$el);
  
          // 参数校验
          this.handleValidator();
  
          // default form wizard
          this.handleWizard();
      }
  });

});
