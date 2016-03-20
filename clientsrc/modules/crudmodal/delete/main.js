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
         * 字段定义数组
         */
        fieldDefine: {
            type: Array,
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

            this.fieldDefine.forEach(item => {
                items.push({
                    fieldName: item.fieldName,
                    title: item.title,
                    value: this.initData[item.fieldName]
                });
            });

            this.items = items;

            if (this.param) {
                this.param.forEach(item => {
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
