define('modules/codingitem_index/save/main', function(require, exports, module) {

  /**
   * 后期再提供解析当前数据库结构，根据sql语句反解析
   */
  
  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  module.exports = Vue.extend({
      template: "<div class=\"save-wizard\">\r\n\r\n    <wizard :title=\"title\" :step-items=\"stepItems\" :rules-options=\"rulesOptions\" v-on:wizardcancel=\"backToInit\">\r\n        \r\n        <wizard-item css=\"active\" id=\"tab1\" title=\"基础信息配置\">   \r\n            <input type=\"hidden\" name=\"codingId\" v-model=\"codingId\">  \r\n            <he-form-item title=\"字段名称\" required horizontal>\r\n                <input type=\"text\" name=\"fieldName\" v-model=\"fieldName\">\r\n            </he-form-item>            \r\n            <he-form-item title=\"中文名称\" horizontal>\r\n                <input type=\"text\" name=\"cnName\" v-model=\"cnName\">\r\n            </he-form-item> \r\n            <he-form-item title=\"字段状态\" required horizontal>\r\n                <select2 name=\"state\" :value.sync=\"state\">\r\n                    <select2-option title=\"有效\" value=\"1\"></select2-option>\r\n                    <select2-option title=\"无效\" value=\"-1\"></select2-option>\r\n                </select2>\r\n            </he-form-item>\r\n            <he-form-item title=\"备注\" col=\"3-9\" horizontal>\r\n                <textarea name=\"remark\" v-model=\"remark\" rows=\"3\"></textarea>\r\n            </he-form-item>  \r\n        </wizard-item>\r\n\r\n        <wizard-item id=\"tab2\" title=\"配置数据库中的字段及含义\">  \r\n            <he-form-item horizontal>\r\n                <he-checkbox name=\"isDb\" title=\"是否数据库字段\" :checked.sync=\"isDb\"></he-checkbox>                   \r\n            </he-form-item>     \r\n            <template v-if=\"isDb\">\r\n                <he-form-item title=\"数据库字段模版\" help=\"预置了常用的字段配置，注意改变本字段会导致数据被覆盖。\" horizontal>\r\n                    <select2 name=\"dbTemplate\" :value.sync=\"dbTemplate\">\r\n                        <select2-option title=\"ID\" value=\"id\"></select2-option>\r\n                        <select2-option title=\"名字\" value=\"name\"></select2-option>                        \r\n                    </select2>\r\n                </he-form-item>     \r\n                <he-form-item title=\"数据库字段名称\" required horizontal>\r\n                    <input type=\"text\" name=\"dbName\" v-model=\"dbName\">\r\n                </he-form-item>     \r\n                <he-form-item title=\"类型\" col=\"3-9\" required horizontal>\r\n                    <select2 name=\"type\" :value.sync=\"type\">\r\n                        <select2-option title=\"字符串 varchar\" value=\"varchar\"></select2-option>\r\n                        <select2-option title=\"字符串 char\" value=\"char\"></select2-option>\r\n                        <select2-option title=\"整型 int\" value=\"int\"></select2-option>\r\n                        <select2-option title=\"日期 date\" value=\"date\"></select2-option>\r\n                        <select2-option title=\"时间 datetime\" value=\"datetime\"></select2-option>\r\n                        <select2-option title=\"文本 text\" value=\"text\"></select2-option>\r\n                    </select2>\r\n                </he-form-item> \r\n                <he-form-item title=\"长度\" col=\"3-9\" help=\"字符串和数字则需要定义长度\" horizontal>\r\n                    <input type=\"text\" name=\"length\" v-model=\"length\">\r\n                </he-form-item>\r\n                <he-form-item title=\"默认值\" col=\"3-9\" horizontal>\r\n                    <input type=\"text\" name=\"defaultVal\" v-model=\"defaultVal\">\r\n                </he-form-item>\r\n                <he-form-item title=\"更多选项\" col=\"3-9\" horizontal>\r\n                    <div class=\"checkbox-list\">\r\n                        <he-checkbox name=\"isNotNull\" title=\"是否非空\" :checked.sync=\"isNotNull\"></he-checkbox>\r\n                        <he-checkbox name=\"isAutoIncrease\" title=\"是否自增\" :checked.sync=\"isAutoIncrease\"></he-checkbox>\r\n                        <he-checkbox name=\"isKey\" title=\"是否主键\" :checked.sync=\"isKey\"></he-checkbox>\r\n                        <he-checkbox name=\"isUnique\" title=\"是否唯一\" :checked.sync=\"isUnique\"></he-checkbox>\r\n                        <he-checkbox name=\"isForeignKey\" title=\"是否外键\" :checked.sync=\"isForeignKey\"></he-checkbox>\r\n                    </div>\r\n                </he-form-item>\r\n                <he-form-item title=\"外键配置\" col=\"3-9\" help=\"格式： tableName-key\" horizontal v-show=\"isForeignKey\">\r\n                    <input type=\"text\" name=\"foreignConfig\" v-model=\"foreignConfig\">\r\n                </he-form-item>\r\n                <he-form-item title=\"字段注释\" col=\"3-9\" horizontal>\r\n                    <textarea name=\"comment\" v-model=\"comment\" rows=\"3\"></textarea>\r\n                </he-form-item>                    \r\n               \r\n                <he-form-item title=\"属性\" col=\"3-9\" horizontal>\r\n                    <select2 name=\"property\" allow-clear  :value.sync=\"property\">\r\n                        <select2-option title=\"UNSIGNED\" value=\"UNSIGINED\"></select2-option>\r\n                    </select2>\r\n                </he-form-item>   \r\n            </template>  \r\n        </wizard-item>\r\n\r\n        <wizard-item id=\"tab3\" title=\"配置在页面中的展示和校验\">\r\n            <he-form-item title=\"在这些页面中出现\" col=\"3-9\" horizontal>\r\n                <div class=\"checkbox-list\">\r\n                    <he-checkbox name=\"isForeignKey\" title=\"列表页\" :checked.sync=\"isForeignKey\"></he-checkbox>\r\n                    <he-checkbox name=\"isNotNull\" title=\"新增页\" :checked.sync=\"isNotNull\"></he-checkbox>\r\n                    <he-checkbox name=\"isAutoIncrease\" title=\"编辑页\" :checked.sync=\"isAutoIncrease\"></he-checkbox>\r\n                    <he-checkbox name=\"isKey\" title=\"详情页\" :checked.sync=\"isKey\"></he-checkbox>\r\n                    <he-checkbox name=\"isUnique\" title=\"删除页\" :checked.sync=\"isUnique\"></he-checkbox>\r\n                </div>\r\n            </he-form-item>\r\n        </wizard-item>\r\n\r\n        <wizard-item id=\"tab4\" title=\"Confirm your account\">\r\n\r\n            <h4 class=\"form-section\">Account</h4>\r\n            <he-form-item title=\"Username:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{username}} </p>\r\n            </he-form-item>     \r\n\r\n            <h4 class=\"form-section\">Profile</h4>     \r\n            <he-form-item title=\"Fullname:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{fullname}} </p>\r\n            </he-form-item>     \r\n            <he-form-item title=\"Remarks:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{remarks}} </p>\r\n            </he-form-item>      \r\n\r\n            <h4 class=\"form-section\">Billing</h4>\r\n            <he-form-item title=\"Card Holder Name:\" col=\"3-4\" horizontal>\r\n                <p class=\"form-control-static\" > {{card_name}} </p>\r\n            </he-form-item>      \r\n\r\n        </wizard-item>\r\n\r\n    </wizard>\r\n\r\n</div>\r\n",
      data: function data() {
          return {
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
                  fieldName: {
                      required: true
                  },
                  dbName: {
                      required: true
                  },
                  type: {
                      required: true
                  }
              },
              fieldName: '', // 字段名称
              cnName: '', // 中文名称
              state: '1', // 字段状态
              remark: '', // 备注
              isDb: true, // 是否为数据库字段
              dbName: '', // 数据库中字段名称
              dbTemplate: '', // 数据库字段模版，用于快速设定常用的字段
              type: 'varchar', // 类型
              length: 0, // 长度，只有varchar、char、int类型时有必要设置 TODO 默认值待优化
              defaultVal: '', // 默认值
              property: '', // 属性，如果是id，需要定义为UNSIGNED
              isNotNull: true, // 是否非空
              isAutoIncrease: false, // 是否自增
              isKey: false, // 是否主键
              isUnique: false, // 是否唯一
              isForeignKey: false, // 是否外键
              comment: '', // 数据库注释
              isInList: true, // 是否在列表页中出现
              isInAdd: false, // 是否在新增页中出现
              isInModify: false, // 是否在修改页中出现
              isInDetail: false, // 是否在详情页中出现
              isInDelete: false };
      },
      // 是否在删除页中出现
      props: {
          'title': String,
          'codingId': {
              required: true,
              type: Number
          }
      },
      methods: {
          /**
           * 点击取消按钮后，触发的一个事件，用于通知父组件关闭本页面，恢复初始状态
           */
          backToInit: function backToInit() {
              this.$dispatch('backtoinit');
          }
      },
      ready: function ready() {
          console.log('save... ready!');
      }
  });

});
