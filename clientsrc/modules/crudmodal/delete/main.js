var Vue = require('lib/vue');
var Msg = require('components/msg/main');
var mixinsBasicModal = require('mixins/modal/basic/main');

Vue.component('crud-modal-delete', {
    template: __inline('main.html'),
    data: function() {
        return {
            items: [],
            requestParam: {}
        };
    },
    props: {
        /**
         * 数据
         */
        initData: {
            type: Object,
            required: true
        },
        /**
         * 字段定义字典，key为字段名，value为其显示的中文名
         */
        fieldDefine: {
            type: Object,
            required: true
        },
        param: Array,
        url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            'default': '删除'
        }
    },
    mixins: [mixinsBasicModal],
    methods: {
        beforeModal: function() {
            var items = [],
                requestParam = {};

            // TODO 此处的map用法错误
            Object.keys(this.fieldDefine).map(key => {
                items.push({
                    key: key,
                    value: this.initData[key],
                    title: this.fieldDefine[key]
                });
            });

            this.items = items;

            if (this.param) {
                this.param.map(item => {
                    requestParam[item.key] = this.initData[item.fieldName];
                });
            }

            this.requestParam = requestParam;
        },
        triggerSubmit: function(modalId) {
            var self = this;

            $.post(this.url, this.requestParam, function(responseText, statusText) {
                self.dealSuccessRes(responseText, statusText);
            });
        },
        dealSuccessRes: function(responseText, statusText) {
            console.log(responseText, statusText);

            if (statusText !== 'success' || responseText.errno !== 0) {
                // 提示失败
                Msg.error('出错了~~！失败原因：' + JSON.stringify(responseText.errmsg));
            } else {
                // 提示成功
                Msg.success('^_^ 处理成功！');

                // 关闭对话框
                this.hideModal();

                // 刷新列表
                this.reportSuccess(responseText.data);
            }
        }
    }
});
