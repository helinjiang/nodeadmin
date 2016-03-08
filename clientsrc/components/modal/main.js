var Vue = require('lib/vue');

Vue.component('modal', {
    template: __inline('main.html'),
    data: function() {
        return {
            jqModal: undefined
        };
    },
    props: {
        'id': String,
        'css': String,
        'tabindex': {
            type: Number,
            'default': -1
        },
        'title': String,
        'fullwidth': Boolean,
        'longmodal': Boolean,
    },
    computed: {
        'className': function() {
            var arr = [];

            if (this.fullwidth) {
                arr.push('container');
            }

            if (this.longmodal) {
                arr.push('modal-scroll');
            }

            if (this.css) {
                arr.push(this.css);
            }

            return arr.join(' ');
        }
    },
    methods: {
        show: function() {
            // data-focus-on="input:first" 这里是在bootstrap-modal.js中定义了focusOn选项，支持选择器
            this.jqModal.modal();

            // TODO 此处还需要优化
            // 如果是longmodal形式，则在body中增加page-overflow
            if (this.longmodal) {
                $('body').addClass('page-overflow');
            }
        },
        hide: function() {
            this.jqModal.modal('hide');
            if (this.longmodal) {
                $('body').removeClass('page-overflow');
            }
        },
        confirm: function() {
            // 自定义事件，使用方式为v-on:confirm="save"
            this.$dispatch('confirm', this.id);
        },
        reportShown: function(id) {
            this.$dispatch('modalshown', id);
        },
        reportHidden: function(id) {
            this.$dispatch('modalhidden', id);
        },
        _initGeneral: function() {
            // general settings
            $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner =
                '<div class="loading-spinner" style="width: 200px; margin-left: -100px;">' +
                '<div class="progress progress-striped active">' +
                '<div class="progress-bar" style="width: 100%;"></div>' +
                '</div>' +
                '</div>';

            $.fn.modalmanager.defaults.resize = true;
        },
        _listenEvent: function() {
            var self = this;
            this.jqModal.on('shown.bs.modal', function() {
                self.reportShown(self.id);
            }).on('hidden.bs.modal', function() {
                self.reportHidden(self.id);
            });
        }
    },
    ready: function() {
        this.jqModal = $(this.$el);
        this._initGeneral();
        this._listenEvent();
    }
});

/**
 * data-focus-on="input:first"
 */


function _ajaxDialog() {
    //ajax demo:
    var $modal = $('#ajax-modal');

    $('#ajax-demo').on('click', function() {
        // create the backdrop and wait for next modal to be triggered
        $('body').modalmanager('loading');

        setTimeout(function() {
            $modal.load('ui_extended_modals_ajax_sample.html', '', function() {
                $modal.modal();
            });
        }, 1000);
    });

    $modal.on('click', '.update', function() {
        $modal.modal('loading');
        setTimeout(function() {
            $modal
                .modal('loading')
                .find('.modal-body')
                .prepend('<div class="alert alert-info fade in">' +
                    'Updated!<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '</div>');
        }, 1000);
    });
}
