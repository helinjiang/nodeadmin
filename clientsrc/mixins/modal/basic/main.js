// 定义一个混合对象
module.exports = {
    template: '<div>EMPTY</div>',
    methods: {
        beforeModal: function() {

        },
        /**
         * 弹出对话框
         */
        showModal: function() {
            this.beforeModal();

            this.$children[0].show();
        },

        /**
         * 关闭对话框
         */
        hideModal: function() {
            this.$children[0].hide();
        },

        /**
         * 提交表单且返回成功之后，向上冒泡事件，以便父组件能够进行下一步处理
         *
         * TODO 该方法似乎不适合放入在这里，因为它并不是对话框的基本行为
         * 
         */
        reportSuccess: function(data) {
            this.$dispatch('savesuccess', data);
        },

        /**
         * 对话框确定按钮点击之后的回调函数
         */
        triggerSubmit: function(modalId) {
            this.hideModal();
        },
    },
    events: {
        /**
         * 监听子组件modal中的 'confirm' 事件，在点击modal中的确认按钮之后，则会触发该事件
         * 
         * @param  {string} modalId   当前modal的id
         */
        confirm: function(modalId) {
            this.triggerSubmit(modalId);
        },
    },
    ready: function() {
        this.showModal();
    }
};
