var Vue = require('lib/vue');
var App = require('common/app');

var WizardTitle = require('./title/main');
var WizardSteps = require('./steps/main');
var WizardProgress = require('./progress/main');
var WizardTabPane = require('./tabpane/main');
var WizardTabContent = require('./tabcontent/main');
var WizardActions = require('./actions/main');

var MSG_SUCCESS = 'TEST: Your form validation is successful!';
var MSG_ERROR = 'TEST: You have some form errors. Please check below.';

Vue.component('wizard', {
    template: __inline('main.html'),
    components: {
        WizardTitle,
        WizardSteps,
        WizardProgress,
        WizardTabPane,
        WizardTabContent,
        WizardActions
    },
    data: function() {
        return {
            jqForm: undefined,
            stepIndex: 0,
            stepItems: [{
                target: '#tab1',
                title: 'Account Setup'
            }, {
                target: '#tab2',
                title: 'Profile Setup'
            }, {
                target: '#tab3',
                title: 'Billing Setup'
            }, {
                target: '#tab4',
                title: 'Confirm'
            }],
            msgContent: '',
            msgType: '',
            msgHide: true,
            username: '',
            fullname: '',
            remarks: '',
            card_name: '',
        };
    },
    computed: {
        /**
         * 一共有几个步骤
         */
        stepTotal: function() {
            return this.stepItems.length;
        },
        /**
         * 在导航中显示的进度文字
         */
        stepTitle: function() {
            return ' - Step ' + (this.stepIndex + 1) + ' of ' + this.stepTotal;
        }
    },
    props: {
        'title': String,
        'icon': String,
    },
    methods: {
        showError: function(msg) {
            this.msgContent = msg || MSG_ERROR;
            this.msgType = 'danger';
            this.msgHide = false;
        },
        showSuccess: function(msg) {
            this.msgContent = msg || MSG_SUCCESS;
            this.msgType = 'success';
            this.msgHide = false;
        },
        clearMsg: function() {
            this.msgHide = true;
        },
        init: function() {
            if (!jQuery().bootstrapWizard) {
                return;
            }

            var self = this,
                form = this.jqForm;

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

                errorPlacement: function(error, element) { // render error placement for each input type
                    if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
                        error.insertAfter("#form_gender_error");
                    } else if (element.attr("name") == "payment[]") { // for uniform radio buttons, insert the after the given container
                        error.insertAfter("#form_payment_error");
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function(event, validator) { //display error alert on form submit   
                    self.showError(MSG_ERROR);

                    App.scrollTo($('.alert-danger', form), -200);
                },

                highlight: function(element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function(element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function(label) {
                    if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
                        label
                            .closest('.form-group').removeClass('has-error').addClass('has-success');
                        label.remove(); // remove error label here
                    } else { // display success icon for other inputs
                        label
                            .addClass('valid') // mark the current input as valid and display OK icon
                            .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                    }
                },

                submitHandler: function(form) {
                    self.showSuccess(MSG_SUCCESS);
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                }

            });

            // default form wizard
            this._bootstrapWizard();

        },
        _bootstrapWizard: function() {
            var self = this,
                form = this.jqForm;

            var handleTitle = function(tab, navigation, index) {
                self.stepIndex = index;

                App.scrollTo($('.page-title'));
            }

            $(this.$el).bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function(tab, navigation, index, clickedIndex) {
                    self.clearMsg();

                    if (form.valid() == false) {
                        return false;
                    }

                    handleTitle(tab, navigation, clickedIndex);
                },
                onNext: function(tab, navigation, index) {
                    self.clearMsg();

                    if (form.valid() == false) {
                        return false;
                    }

                    handleTitle(tab, navigation, index);
                },
                onPrevious: function(tab, navigation, index) {
                    self.clearMsg();

                    handleTitle(tab, navigation, index);
                },
                onTabShow: function(tab, navigation, index) {
                    self.index = index;
                }
            });
        }
    },
    ready: function() {
        this.jqForm = $('form', this.$el);
        this.init();
    }
});
