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
      template: "<div class=\"wizard\">\r\n    <portlet title=\"Form Wizard - \" icon=\"reorder\" id=\"form_wizard_1\" bodycss=\"form\"> \r\n        <wizard-title slot=\"title\"></wizard-title>\r\n\r\n        <he-form id=\"submit_form\" inner=\"form-wizard\" actionscss=\"fluid\" horizontal>\r\n\r\n            <wizard-steps></wizard-steps>\r\n            <wizard-progress></wizard-progress>\r\n\r\n            <wizard-tab-content>                        \r\n                \r\n                <wizard-tab-pane css=\"active\" id=\"tab1\" title=\"Provide your account details\">\r\n                    <he-form-item title=\"用户名\" col=\"3-4\" help=\"Provide your username\" required horizontal>\r\n                        <input type=\"text\" name=\"username\">\r\n                    </he-form-item>\r\n                </wizard-tab-pane>\r\n\r\n                <wizard-tab-pane id=\"tab2\" title=\"Provide your profile details\">           \r\n                    <he-form-item title=\"Fullname\" col=\"3-4\" help=\"Provide your fullname\" required horizontal>\r\n                        <input type=\"text\" name=\"fullname\">\r\n                    </he-form-item> \r\n\r\n                    <he-form-item title=\"Remarks\" col=\"3-4\" help=\"Provide your fullname\"  horizontal>\r\n                        <textarea rows=\"3\" name=\"remarks\"></textarea>\r\n                    </he-form-item>\r\n                </wizard-tab-pane>\r\n\r\n                <wizard-tab-pane id=\"tab3\" title=\"Provide your billing and credit card details\">\r\n                    <he-form-item title=\"Card Holder Name\" col=\"3-4\" required horizontal>\r\n                        <input type=\"text\" name=\"card_name\">\r\n                    </he-form-item> \r\n                </wizard-tab-pane>\r\n\r\n                <wizard-tab-pane id=\"tab4\" title=\"Confirm your account\">\r\n                    <h4 class=\"form-section\">Account</h4>\r\n                    <div class=\"form-group\">\r\n                        <label class=\"control-label col-md-3\">Username:</label>\r\n                        <div class=\"col-md-4\">\r\n                            <p class=\"form-control-static\" data-display=\"username\">\r\n                            </p>\r\n                        </div>\r\n                    </div>                            \r\n                    <h4 class=\"form-section\">Profile</h4>\r\n                    <div class=\"form-group\">\r\n                        <label class=\"control-label col-md-3\">Fullname:</label>\r\n                        <div class=\"col-md-4\">\r\n                            <p class=\"form-control-static\" data-display=\"fullname\">\r\n                            </p>\r\n                        </div>\r\n                    </div>                            \r\n                    <div class=\"form-group\">\r\n                        <label class=\"control-label col-md-3\">Remarks:</label>\r\n                        <div class=\"col-md-4\">\r\n                            <p class=\"form-control-static\" data-display=\"remarks\">\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n                    <h4 class=\"form-section\">Billing</h4>\r\n                    <div class=\"form-group\">\r\n                        <label class=\"control-label col-md-3\">Card Holder Name:</label>\r\n                        <div class=\"col-md-4\">\r\n                            <p class=\"form-control-static\" data-display=\"card_name\">\r\n                            </p>\r\n                        </div>\r\n                    </div> \r\n                </wizard-tab-pane>\r\n                \r\n            </wizard-tab-content>\r\n           \r\n            <wizard-actions slot=\"actions\"></wizard-actions>\r\n        </he-form>\r\n    </portlet>   \r\n</div>",
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
              isError: false
          };
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
  
              var displayConfirm = function displayConfirm() {
                  $('#tab4 .form-control-static', form).each(function () {
                      var input = $('[name="' + $(this).attr("data-display") + '"]', form);
                      if (input.is(":text") || input.is("textarea")) {
                          $(this).html(input.val());
                      } else if (input.is("select")) {
                          $(this).html(input.find('option:selected').text());
                      } else if (input.is(":radio") && input.is(":checked")) {
                          $(this).html(input.attr("data-title"));
                      } else if ($(this).attr("data-display") == 'payment') {
                          var payment = [];
                          $('[name="payment[]"]').each(function () {
                              payment.push($(this).attr('data-title'));
                          });
                          $(this).html(payment.join("<br>"));
                      }
                  });
              };
  
              var handleTitle = function handleTitle(tab, navigation, index) {
                  var total = navigation.find('li').length;
                  var current = index + 1;
                  // set wizard title
                  $('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);
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
                      displayConfirm();
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
