define('modules/widget/modal/main', function(require, exports, module) {

  'use strict';
  
  var Vue = require('modules/lib/vue');
  
  Vue.component('modal', {
      template: "<div id=\"{{id}}\" class=\"modal {{className}} fade\" tabindex=\"{{tabindex}}\">\r\n    <div class=\"modal-header\" v-if=\"title\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"></button>\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <slot></slot>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-default\"> 取消 </button>\r\n        <button type=\"button\" class=\"btn btn-primary\" v-on:click=\"confirm\"> 确认 </button>\r\n    </div>\r\n</div>",
      props: {
          'id': {
              type: String,
              'default': ''
          },
          'css': {
              type: String,
              'default': ''
          },
          'tabindex': {
              type: Number,
              'default': -1
          },
          'title': String,
          'fullwidth': {
              type: Boolean,
              'default': false
          }
      },
      computed: {
          'className': function className() {
              var arr = [];
  
              if (this.fullwidth) {
                  arr.push('container');
              }
  
              if (this.css) {
                  arr.push(this.css);
              }
  
              return arr.join(' ');
          }
      },
      methods: {
          show: function show() {
              $(this.$el).modal();
          },
          hide: function hide() {
              $(this.$el).modal('hide');
          },
          confirm: function confirm() {
              // 自定义事件，使用方式为v-on:confirm="save"
              this.$dispatch('confirm', this.id);
          }
      },
      ready: function ready() {
          _init();
      }
  });
  
  function _init() {
      $(function () {
          _initGeneral();
      });
  }
  /**
   * data-focus-on="input:first"
   */
  
  function _initGeneral() {
      // general settings
      $.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner = '<div class="loading-spinner" style="width: 200px; margin-left: -100px;">' + '<div class="progress progress-striped active">' + '<div class="progress-bar" style="width: 100%;"></div>' + '</div>' + '</div>';
  
      $.fn.modalmanager.defaults.resize = true;
  }
  
  function _ajaxDialog() {
      //ajax demo:
      var $modal = $('#ajax-modal');
  
      $('#ajax-demo').on('click', function () {
          // create the backdrop and wait for next modal to be triggered
          $('body').modalmanager('loading');
  
          setTimeout(function () {
              $modal.load('ui_extended_modals_ajax_sample.html', '', function () {
                  $modal.modal();
              });
          }, 1000);
      });
  
      $modal.on('click', '.update', function () {
          $modal.modal('loading');
          setTimeout(function () {
              $modal.modal('loading').find('.modal-body').prepend('<div class="alert alert-info fade in">' + 'Updated!<button type="button" class="close" data-dismiss="alert">&times;</button>' + '</div>');
          }, 1000);
      });
  }

});
