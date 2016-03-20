var Vue = require('lib/vue');

var mixinsBasicModal = require('mixins/modal/basic/main');

Vue.component('crud-modal-detail', {
    template: __inline('main.html'),
    data: function() {
        return {
            items: []
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
        title: {
            type: String,
            'default': '详情'
        }
    },
    mixins: [mixinsBasicModal],
    methods: {
        beforeModal: function() {
             var result = [];

            this.fieldDefine.forEach(item => {
                result.push({
                    fieldName: item.fieldName,
                    title: item.title,
                    value: this.initData[item.fieldName]
                });
            });

            this.items = result;
        }
    }
});
