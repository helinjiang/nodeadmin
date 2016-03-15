/**
 * http://jqueryvalidation.org/
 * 基于 jquery.validate.js 修改  
 * TODO 校验放入到js中统一配置还是在标签中设置，这个需要再考虑
 * 如果放在中js中，则统一配置好控制，此时的form组件就定义为轻量级的
 * 如果放在标签内，则更灵活，而且还可以在无JS的情况下利用html5原生的校验能力
 * 也可以两者同时使用。
 */

// http://jqueryvalidation.org/category/plugin/
var defaultOptions = {
    errorElement: 'span', //default input error message container
    errorClass: 'help-block', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    ignore: ".ignore", //http://fanshuyao.iteye.com/blog/2243544，select2的校验问题

    /**
     * hightlight error inputs  
     * @param  {object}   element Dom元素input
     */
    highlight: function(element) {
        // set error class to the control group
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },

    /**
     * revert the change done by hightlight
     * @param  {object}   element Dom元素input
     */
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },

    /**
     * display error alert on form submit   
     * @param  {[type]}   event     [description]
     * @param  {[type]}   validator [description]
     */
    // invalidHandler: function(event, validator) {
    // },

    success: function(label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
    },

    /**
     * render error placement for each input type
     * @param  {object}   error   Dom元素
     * @param  {object}   element [description]
     */
    errorPlacement: function(error, element) {
        var errwrap = element.closest('.errwrap');
        if (errwrap.length) {
            error.appendTo(element.closest('.errwrap'));
        } else {
            // 默认，element为input元素
            error.insertAfter(element);
        }

    },

    /**
     * 提交操作
     * @param  {object}   form Dom元素
     * @author helinjiang
     * @date   2016-02-28
     */
    submitHandler: function(form) {
        // 默认是提交表单，如果是ajax提交，则请覆盖之
        form.submit();
    }
};


/**
 * 校验form，支持rulesOptions集中配置，也支持在input中进行配置
 * @param  {object}   jqForm       form的jQuery对象
 * @param  {object}   rulesOptions 校验对象定义
 * @param  {object}   validatorOptions     validator的配置参数
 * @param  {object}   handler     自定义的一些处理方法
 */
function check(jqForm, rulesOptions, validatorOptions, handler) {
    if (!jqForm.length || typeof rulesOptions !== "object") {
        return;
    }

    if (typeof validatorOptions !== "object") {
        validatorOptions = {};
    }

    if (typeof handler !== "object") {
        handler = {};
    }

    // 从 rulesOptions 中获得 rules 和 messages
    var rulesAndMessages = getRulesAndMessages(rulesOptions);

    // 获得options
    var options = $.extend({}, defaultOptions, rulesAndMessages, validatorOptions);

    // 如果还有 handler，相对于钩子，则再追加操作。

    jqForm.validate(options);
}


function getRulesAndMessages(rulesOptions) {
    if ($.isEmptyObject(rulesOptions)) {
        return {};
    }

    // username: {
    //     required: {
    //         rule: true,
    //         message: '用户名不能为空！'
    //     },
    //     minlength: {
    //         rule: 2,
    //         message: '最小长度为2'
    //     },
    //     maxlength: {
    //         rule: 6,
    //         message: '最大长度为6'
    //     }
    // }

    var options = {},
        rules = {},
        messages = {};

    for (var k in rulesOptions) { // k=username
        if (rulesOptions.hasOwnProperty(k)) {
            var v = rulesOptions[k];
            for (var vk in v) { // vk=required
                // 这里的vk是校验器的名字，vv是校验器的设置，为对象或者是字符串
                var vv = v[vk];

                if (typeof vv === 'object') {
                    // 如果校验器对应的值不是对象，则要解析其中的rule和message
                    // 校验器的传值 rule
                    if (vv.rule) {
                        if (!rules[k]) {
                            rules[k] = {};
                        }
                        rules[k][vk] = vv.rule;
                    }

                    // 校验器失败之后的提示 message
                    if (vv.message) {
                        if (!messages[k]) {
                            messages[k] = {};
                        }
                        messages[k][vk] = vv.message;
                    }
                } else {
                    // 如果校验器对应的值不是对象，则将其当作 rule
                    if (!rules[k]) {
                        rules[k] = {};
                    }
                    rules[k][vk] = vv;
                }
            }
        }
    }

    if (!$.isEmptyObject(rules)) {
        options.rules = rules;
    }

    if (!$.isEmptyObject(messages)) {
        options.messages = messages;
    }

    return options;
}

/**
 * 校验并返回校验结果，如果传入了表单元素name，则只校验该name，否则全表单所有的元素都校验
 * @param  {object} jqForm form或者表单元素
 * @param  {string} fieldName form中的某个表单元素的name属性值
 * @return {boolean}          
 */
function valid(jqForm, fieldName) {
    if (!jqForm || !jqForm.length) {
        return false;
    }

    if (!fieldName) {
        return jqForm.valid();
    } else {
        return $('[name="' + fieldName + '"]', jqForm).valid();
    }

}

module.exports = {
    check: check,
    valid: valid
};
