var Vue = require('lib/vue');
var App = require('common/app');
var Validator = require('common/validator');

var WizardTitle = require('./title/main');
var WizardSteps = require('./steps/main');
var WizardProgress = require('./progress/main');
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
        WizardTabContent,
        WizardActions
    },
    data: function() {
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
        title: String,
        stepItems: {
            type: Array,
            required: true
        },
        rulesOptions: Object
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
        handleValidator: function() {
            var self = this,
                form = this.jqForm;

            Validator.check(this.jqForm, this.rulesOptions, {
                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                ignore: ':hidden',

                invalidHandler: function(event, validator) { //display error alert on form submit   
                    self.showError(MSG_ERROR);

                    App.scrollTo($('.alert-danger', form), -200);
                },

                success: function(label) {
                    label
                        .addClass('valid') // mark the current input as valid and display OK icon
                        .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                },

                submitHandler: function(form) {
                    self.showSuccess(MSG_SUCCESS);
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                }
            });
        },
        handleWizard: function() {
            if (!jQuery().bootstrapWizard) {
                return;
            }

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

        // 参数校验
        this.handleValidator();

        // default form wizard
        this.handleWizard();
    }
});
