/**
https://github.com/pandao/editor.md
 */

var Vue = require('lib/vue');

Vue.component('editormd', {
    template: __inline('main.html'),
    data: function() {
        return {
            /**
             * 当前select2的options范围，包括select2-option中数据和init-data或者url或者ajax数据的集合
             */
            data: [],
            jqSelect: undefined
        };
    },
    props: {
        /**
         * input 的name 值，必须
         */
        name: {
            type: String,
            required: true
        },
        /**
         * 初始值
         */
        value: null,
        /**
         * 初始data
         */
        initData: Array,
        /**
         * 数据来源地址
         */
        url: String,
        /**
         * 数据转换函数名，在select2render.js中定义。
         * 不同的接口返回的数据不一定相同，可以接口返回之前转换，也可以前台定义此字段来转换
         */
        convert: String,
        placeholder: {
            type: String,
            'default': '请选择'
        },
        allowClear: Boolean,
        /**
         * 是否懒渲染
         */
        lazy: Boolean,
        /**
         * 是否为ajax请求远程数据？
         */
        ajax: Boolean
    },

    ready: function() {
        var testEditor = editormd("test-editormd", {
            width: "90%",
            height: 740,
            path: '/static/plugins/editor.md/lib/',
            theme: "dark",
            previewTheme: "dark",
            editorTheme: "pastel-on-dark",
            // markdown: md,
            codeFold: true,
            //syncScrolling : false,
            saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
            searchReplace: true,
            //watch : false,                // 关闭实时预览
            htmlDecode: "style,script,iframe|on*", // 开启 HTML 标签解析，为了安全性，默认不开启    
            //toolbar  : false,             //关闭工具栏
            //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji: true,
            taskList: true,
            tocm: true, // Using [TOCM]
            tex: true, // 开启科学公式TeX语言支持，默认关闭
            flowChart: true, // 开启流程图支持，默认关闭
            sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
            //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
            //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
            //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload: true,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "./php/upload.php",
            onload: function() {
                console.log('onload', this);
                //this.fullscreen();
                //this.unwatch();
                //this.watch().fullscreen();

                //this.setMarkdown("#PHP");
                //this.width("100%");
                //this.height(480);
                //this.resize("100%", 640);
            }
        });
    }
});
