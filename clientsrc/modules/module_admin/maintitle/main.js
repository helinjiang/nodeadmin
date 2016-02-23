var Vue = require('lib/vue');

var menuData = require('common/menudata');

Vue.component('admin-main-title', {
    template: __inline('main.html'),
    props: {
        'title': {
            type: String,
            required: true
        },
        'desc': String,

        /**
         * 面包屑设置，格式为 name|url|icon;name|url|icon
         */
        'items': {
            coerce: function(val) {
                if (!val) {
                    return [{
                        name: 'Home',
                        url: 'index.html',
                        icon: 'home'
                    }];
                }

                var itemArr = val.split(';'),
                    length = itemArr.length,
                    result = [];

                for (var i = 0; i < length; i++) {
                    var item = itemArr[i],
                        arr = item.split('|'),
                        obj = {};

                    obj.name = arr[0];
                    obj.url = arr[1] || 'javascript:;';
                    obj.icon = arr[2] || '';

                    result.push(obj);
                }

                // 最后一个元素不加>
                result[length-1].last=true;

                return result; 
            }
        }
    },
    ready: function() {

    }
});
