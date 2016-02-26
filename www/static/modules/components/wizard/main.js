define('modules/components/wizard/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  var App = require('modules/common/app');
  
  var WizardTitle = require('modules/components/wizard/title/main');
  var WizardSteps = require('modules/components/wizard/steps/main');
  var WizardProgress = require('modules/components/wizard/progress/main');
  var WizardTabPane = require('modules/components/wizard/tabpane/main');
  var WizardTabContent = require('modules/components/wizard/tabcontent/main');
  var WizardActions = require('modules/components/wizard/actions/main');
  
  Vue.component('wizard', {
      template: "<div class=\"wizard\">\r\n    <portlet :title=\"title\" icon=\"reorder\" id=\"form_wizard_1\" bodycss=\"form\"> \r\n        <wizard-title slot=\"title\" :value=\"stepTitle\"></wizard-title>\r\n\r\n        <he-form id=\"submit_form\" inner=\"form-wizard\" actionscss=\"fluid\" horizontal>\r\n\r\n            <wizard-steps v-ref:steps></wizard-steps>\r\n            <wizard-progress></wizard-progress>\r\n\r\n            <wizard-tab-content>                        \r\n                \r\n                <wizard-tab-pane css=\"active\" id=\"tab1\" title=\"Provide your account details\">\r\n                    <he-form-item title=\"用户名\" col=\"3-4\" help=\"Provide your username\" required horizontal>\r\n                        <input type=\"text\" name=\"username\" v-model=\"username\">\r\n                    </he-form-item>\r\n                </wizard-tab-pane>\r\n\r\n                <wizard-tab-pane id=\"tab2\" title=\"Provide your profile details\">           \r\n                    <he-form-item title=\"Fullname\" col=\"3-4\" help=\"Provide your fullname\" required horizontal>\r\n                        <input type=\"text\" name=\"fullname\" v-model=\"fullname\">\r\n                    </he-form-item> \r\n\r\n                    <he-form-item title=\"Remarks\" col=\"3-4\" help=\"Provide your fullname\"  horizontal>\r\n                        <textarea rows=\"3\" name=\"remarks\"  v-model=\"remarks\"></textarea>\r\n                    </he-form-item>\r\n                </wizard-tab-pane>\r\n\r\n                <wizard-tab-pane id=\"tab3\" title=\"Provide your billing and credit card details\">\r\n                    <he-form-item title=\"Card Holder Name\" col=\"3-4\" required horizontal>\r\n                        <input type=\"text\" name=\"card_name\" v-model=\"card_name\">\r\n                    </he-form-item> \r\n                </wizard-tab-pane>\r\n\r\n                <wizard-tab-pane id=\"tab4\" title=\"Confirm your account\">\r\n\r\n                    <h4 class=\"form-section\">Account</h4>\r\n                    <he-form-item title=\"Username:\" col=\"3-4\" horizontal>\r\n                        <p class=\"form-control-static\" > {{username}} </p>\r\n                    </he-form-item>     \r\n\r\n                    <h4 class=\"form-section\">Profile</h4>     \r\n                    <he-form-item title=\"Fullname:\" col=\"3-4\" horizontal>\r\n                        <p class=\"form-control-static\" > {{fullname}} </p>\r\n                    </he-form-item>     \r\n                    <he-form-item title=\"Remarks:\" col=\"3-4\" horizontal>\r\n                        <p class=\"form-control-static\" > {{remarks}} </p>\r\n                    </he-form-item>      \r\n\r\n                    <h4 class=\"form-section\">Billing</h4>\r\n                    <he-form-item title=\"Card Holder Name:\" col=\"3-4\" horizontal>\r\n                        <p class=\"form-control-static\" > {{card_name}} </p>\r\n                    </he-form-item>      \r\n\r\n                </wizard-tab-pane>\r\n                \r\n            </wizard-tab-content>\r\n           \r\n            <wizard-actions slot=\"actions\"></wizard-actions>\r\n        </he-form>\r\n    </portlet>   \r\n</div>",
      components: {
          WizardTitle: WizardTitle,
          WizardSteps: WizardSteps,
          WizardProgress: WizardProgress,
          WizardTabPane: WizardTabPane,
          WizardTabContent: WizardTabContent,
          WizardActions: WizardActions
      },
      data: function data() {
          return {
              jqForm: undefined,
              stepIndex: 0,
              stepTotal: 0,
              username: '',
              fullname: '',
              remarks: '',
              card_name: ''
          };
      },
      computed: {
          /**
           * 在导航中显示的进度文字
           */
          stepTitle: function stepTitle() {
              return ' - Step ' + (this.stepIndex + 1) + ' of ' + this.stepTotal;
          }
      },
      props: {
          'title': String,
          'icon': String
      },
      methods: {
          showError: function showError(msg) {},
          init: function init() {
              if (!jQuery().bootstrapWizard) {
                  return;
              }
  
              // 获得所有步骤数目
              this.stepTotal = this.$refs.steps.getLength();
  
              var self = this;
  
              var form = this.jqForm;
              var error = $('.alert-danger', form);
              var success = $('.alert-success', form);
  
              form.validate({
                  doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                  errorElement: 'span', //default input error message container
                  errorClass: 'help-block', // default input error message class
                  focusInvalid: false, // do not focus the last invalid input
                  rules: {
                      //account
                      username: {
                          minlength: 5,
                          required: true
                      },
                      //profile
                      fullname: {
                          required: true
                      },
                      //payment
                      card_name: {
                          required: true
                      }
                  },
  
                  errorPlacement: function errorPlacement(error, element) {
                      // render error placement for each input type
                      if (element.attr("name") == "gender") {
                          // for uniform radio buttons, insert the after the given container
                          error.insertAfter("#form_gender_error");
                      } else if (element.attr("name") == "payment[]") {
                          // for uniform radio buttons, insert the after the given container
                          error.insertAfter("#form_payment_error");
                      } else {
                          error.insertAfter(element); // for other inputs, just perform default behavior
                      }
                  },
  
                  invalidHandler: function invalidHandler(event, validator) {
                      //display error alert on form submit  
                      success.hide();
                      error.show();
                      App.scrollTo(error, -200);
                  },
  
                  highlight: function highlight(element) {
                      // hightlight error inputs
                      $(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
                  },
  
                  unhighlight: function unhighlight(element) {
                      // revert the change done by hightlight
                      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
                  },
  
                  success: function success(label) {
                      if (label.attr("for") == "gender" || label.attr("for") == "payment[]") {
                          // for checkboxes and radio buttons, no need to show OK icon
                          label.closest('.form-group').removeClass('has-error').addClass('has-success');
                          label.remove(); // remove error label here
                      } else {
                              // display success icon for other inputs
                              label.addClass('valid') // mark the current input as valid and display OK icon
                              .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                          }
                  },
  
                  submitHandler: function submitHandler(form) {
                      success.show();
                      error.hide();
                      //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                  }
  
              });
  
              var handleTitle = function handleTitle(tab, navigation, index) {
                  var total = self.stepTotal;
                  var current = index + 1;
                  // set wizard title
                  self.stepIndex = index;
                  // set done steps
                  jQuery('li', $('#form_wizard_1')).removeClass("done");
                  var li_list = navigation.find('li');
                  for (var i = 0; i < index; i++) {
                      jQuery(li_list[i]).addClass("done");
                  }
  
                  if (current == 1) {
                      $('#form_wizard_1').find('.button-previous').hide();
                  } else {
                      $('#form_wizard_1').find('.button-previous').show();
                  }
  
                  if (current >= total) {
                      $('#form_wizard_1').find('.button-next').hide();
                      $('#form_wizard_1').find('.button-submit').show();
                  } else {
                      $('#form_wizard_1').find('.button-next').show();
                      $('#form_wizard_1').find('.button-submit').hide();
                  }
                  App.scrollTo($('.page-title'));
              };
  
              // default form wizard
              $('#form_wizard_1').bootstrapWizard({
                  'nextSelector': '.button-next',
                  'previousSelector': '.button-previous',
                  onTabClick: function onTabClick(tab, navigation, index, clickedIndex) {
                      success.hide();
                      error.hide();
                      if (form.valid() == false) {
                          return false;
                      }
                      handleTitle(tab, navigation, clickedIndex);
                  },
                  onNext: function onNext(tab, navigation, index) {
                      success.hide();
                      error.hide();
  
                      if (form.valid() == false) {
                          return false;
                      }
  
                      handleTitle(tab, navigation, index);
                  },
                  onPrevious: function onPrevious(tab, navigation, index) {
                      success.hide();
                      error.hide();
  
                      handleTitle(tab, navigation, index);
                  },
                  onTabShow: function onTabShow(tab, navigation, index) {
                      var total = navigation.find('li').length;
                      var current = index + 1;
                      var $percent = current / total * 100;
                      $('#form_wizard_1').find('.progress-bar').css({
                          width: $percent + '%'
                      });
                  }
              });
  
              $('#form_wizard_1').find('.button-previous').hide();
              $('#form_wizard_1 .button-submit').click(function () {
                  alert('Finished! Hope you like it :)');
              }).hide();
          }
      },
      ready: function ready() {
          this.jqForm = $('form', this.$el);
          this.init();
      }
  });

});
