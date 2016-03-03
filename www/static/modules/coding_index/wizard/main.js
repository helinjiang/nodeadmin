define('modules/coding_index/wizard/main', function(require, exports, module) {

  /**
   * 后期再提供解析当前数据库结构，根据sql语句反解析
   */
  
  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"test-wizard\">\r\n\r\n    <wizard :title=\"title\" :step-items=\"stepItems\" :rules-options=\"rulesOptions\">\r\n        \r\n        <wizard-item css=\"active\" id=\"tab1\" title=\"配置数据库中的字段及含义\">     \r\n            <div class=\"row\">\r\n               <div class=\"col-md-6\">\r\n                    <he-form-item title=\"字段名\" col=\"3-9\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\" placeholder=\"在数据库中的字段名，推荐小驼峰形式\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"中文名称\" col=\"3-9\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>                    \r\n                    <he-form-item title=\"类型\" col=\"3-9\" help=\"可选可输入。时间用什么存储呢？\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"长度\" col=\"3-9\" help=\"int、char、varchar才需要定义长度\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"默认值\" col=\"3-9\" help=\"可选可输入\" horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"属性\" col=\"3-9\" help=\"下拉选择，比如UNSIGINED\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"是否非空\" col=\"3-9\" horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"索引\" col=\"3-9\" help=\"定义主键或唯一信息\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"是否自增\" col=\"3-9\" horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"注释\" col=\"3-9\" help=\"备注和解释\" required horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item title=\"外键配置\" col=\"3-9\" help=\"此处可能有多个\" horizontal>\r\n                        <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n                    </he-form-item>\r\n                    <he-form-item col=\"3-9\" horizontal>\r\n                        <button class=\"btn btn-info\">保存</button>\r\n                    </he-form-item>\r\n               </div>\r\n               <div class=\"col-md-6\">\r\n                   \r\n               </div>\r\n           </div>       \r\n                   \r\n        </wizard-item>\r\n\r\n        <wizard-item id=\"tab2\" title=\"基础信息配置\">           \r\n            <he-form-item title=\"目标名\" col=\"3-4\" help=\"用以描述这是xx管理系统\" required horizontal>\r\n                <input type=\"text\" name=\"targetName\" v-model=\"targetName\">\r\n            </he-form-item>\r\n\r\n            <he-form-item title=\"功能描述\" col=\"3-4\" help=\"简单描述这个系统是用于做什么的\" horizontal>\r\n                <textarea rows=\"3\" name=\"targetDesc\"  v-model=\"targetDesc\"></textarea>\r\n            </he-form-item>\r\n\r\n            <he-form-item title=\"菜单ID\" col=\"3-4\" help=\"用于在左侧导航栏中高亮\" required horizontal>\r\n                <input type=\"text\" name=\"menuId\" v-model=\"menuId\">\r\n            </he-form-item>\r\n\r\n            <he-form-item title=\"面包屑导航\" col=\"3-4\" help=\"用于在左侧导航栏中高亮\" required horizontal>\r\n                <input type=\"text\" name=\"breadcrumb\" v-model=\"breadcrumb\">\r\n            </he-form-item>\r\n        </wizard-item>\r\n\r\n        <wizard-item id=\"tab3\" title=\"Provide your billing and credit card details\">\r\n            <he-form-item title=\"Card Holder Name\" col=\"3-4\" required horizontal>\r\n                <input type=\"text\" name=\"card_name\" v-model=\"card_name\">\r\n            </he-form-item> \r\n        </wizard-item>\r\n\r\n        <wizard-item id=\"tab4\" title=\"Confirm your account\">\r\n\r\n            <h4 class=\"form-section\">Account</h4>\r\n            <he-form-item title=\"Username:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{username}} </p>\r\n            </he-form-item>     \r\n\r\n            <h4 class=\"form-section\">Profile</h4>     \r\n            <he-form-item title=\"Fullname:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{fullname}} </p>\r\n            </he-form-item>     \r\n            <he-form-item title=\"Remarks:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{remarks}} </p>\r\n            </he-form-item>      \r\n\r\n            <h4 class=\"form-section\">Billing</h4>\r\n            <he-form-item title=\"Card Holder Name:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{card_name}} </p>\r\n            </he-form-item>      \r\n\r\n        </wizard-item>\r\n\r\n    </wizard>\r\n\r\n</div>\r\n",
      data: function data() {
          return {
              username: '',
              fullname: '',
              remarks: '',
              card_name: '',
              title: '代码生成器',
              stepItems: [{
                  target: '#tab1',
                  title: '基础配置'
              }, {
                  target: '#tab2',
                  title: '数据库配置'
              }, {
                  target: '#tab3',
                  title: '新增页'
              }, {
                  target: '#tab4',
                  title: 'Confirm'
              }],
              rulesOptions: {
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
              }
          };
      },
      ready: function ready() {}
  });

});
