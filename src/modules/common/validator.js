 /**
  * 基于 jquery.validate.js 修改  
  * TODO 校验放入到js中统一配置还是在标签中设置，这个需要再考虑
  * 如果放在中js中，则统一配置好控制，此时的form组件就定义为轻量级的
  * 如果放在标签内，则更灵活，而且还可以在无JS的情况下利用html5原生的校验能力
  * 也可以两者同时使用。
  */

 /**
  * 校验form，支持checkConfig集中配置，也支持在input中进行配置
  * @param  {[type]}   $form       [description]
  * @param  {[type]}   checkConfig [description]
  * @param  {[type]}   handler     [description]
  * @return {[type]}               [description]
  * @author helinjiang
  * @date   2016-01-17
  */
 function check($form, checkConfig, handler) {
     if (!$form.length) {
         return;
     }

     // 处理handler
     // var handler = {
     //     invalidHandler: function(event, validator) { },
     //     submitHandler: function(form) { }
     // }

     var validateConfig = {
         errorElement: 'span', //default input error message container
         errorClass: 'help-block', // default input error message class
         focusInvalid: false, // do not focus the last invalid input

         invalidHandler: function(event, validator) { //display error alert on form submit   
             if (handler && handler.invalidHandler) {
                 handler.invalidHandler(event, validator);
             }
         },

         highlight: function(element) { // hightlight error inputs
             $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
         },

         success: function(label) {
             label.closest('.form-group').removeClass('has-error');
             label.remove();
         },

         errorPlacement: function(error, element) {
             error.insertAfter(element.closest('.input-icon'));
         },

         submitHandler: function(form) {
             if (handler && handler.submitHandler) {
                 handler.submitHandler(form);
             } else {
                 form.submit();
             }
         }
     }

     // 处理checkConfig
     // var checkConfig = {
     //     username: {
     //         required: {
     //             rule: true,
     //             message: '用户名不能为空！'
     //         },
     //         minlength: {
     //             rule: 2,
     //             message: '最小长度为2'
     //         },
     //         maxlength: {
     //             rule: 6,
     //             // message: '最大长度为6'
     //         }
     //     }
     // }
     if (!$.isEmptyObject(checkConfig)) {
         var rules = {},
             messages = {};

         for (var k in checkConfig) { // k=username
             if (checkConfig.hasOwnProperty(k)) {
                 var v = checkConfig[k];
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
             validateConfig.rules = rules;
         }

         if (!$.isEmptyObject(messages)) {
             validateConfig.messages = messages;
         }
     }


     // console.log(validateConfig);

     $form.validate(validateConfig);
 }


 module.exports = {
     check: check
 }