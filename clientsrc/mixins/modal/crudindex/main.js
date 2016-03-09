// 定义一个混合对象
module.exports = {
    template: __inline('main.html'),
    data: function() {
        return {
            datagridUrl: '',            
            datagridTitle: '',    
            datagridItem:[],        
            isShowSaveModal: false,
            isShowDetailModal: false,
            isShowDeleteModal: false,
            initData: {},
            isAdd: true,
            saveUrl: '',
            saveTitle: '',
            detailField: {},
            detailTitle: '',
            deleteField: {},
            deleteParam: {},
            deleteUrl: '',
            deleteTitle: ''
        };
    },
    methods: {
        operate: function(event) {
            var target = event.target,
                $target = $(target),
                type = $target.data('type'),
                id,
                data;

            if (!type || ['modify', 'delete', 'detail'].indexOf(type) < 0) {
                return;
            }

            id = $target.data('id');

            data = this.getDataById(id);

            if (!data) {
                return;
            }

            switch (type) {
                case 'modify':
                    this.showModifyPage(data);
                    break;
                case 'detail':
                    this.showDetailPage(data);
                    break;
                case 'delete':
                    this.showDeletePage(data);
                    break;
                default:
                    break;
            }
        },
        reloadDataGrid: function() {
            this.$refs.datagrid.reload();
        },
        beforeShowAddPage: function() {
            // 设置初始值
        },
        beforeShowModifyPage: function(data) {
            // 设置初始值
        },
        beforeShowDetailPage: function(data) {
            // 设置初始值            
        },
        beforeShowDeletePage: function(data) {
            // 设置初始值
        },
        showAddPage: function() {
            this.isAdd = true;

            this.beforeShowAddPage();

            this.isShowSaveModal = true;
        },
        showModifyPage: function(data) {
            this.isAdd = false;

            this.beforeShowModifyPage(data);

            this.isShowSaveModal = true;
        },
        showDetailPage: function(data) {
            this.beforeShowDetailPage(data);

            this.isShowDetailModal = true;
        },
        showDeletePage: function(data) {
            this.beforeShowDeletePage(data);

            this.isShowDeleteModal = true;
        },
        getDataById: function(id) {
            if (!id) {
                console.error('No ID!');
                return;
            }

            var data = this.$refs.datagrid.getDataById('id', id);

            if (!data) {
                console.error('No data of id=' + id);
                return;
            }

            return data;
        }
    },
    events: {
        /**
         * 监听子组件modal中的 'savesuccess' 事件，
         * 在modal中处理完form中的数据后，则会触发该事件
         * 
         */
        savesuccess: function() {
            this.reloadDataGrid();
        },

        /**
         * 监听子组件modal中的 'modalhidden' 事件，
         * 在关闭modal后，则会触发该事件
         * 
         */
        modalhidden: function() {
            this.isShowSaveModal = false;
            this.isShowDetailModal = false;
            this.isShowDeleteModal = false;
        },
    }
};
