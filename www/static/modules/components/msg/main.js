define('modules/components/msg/main', function(require, exports, module) {

  'use strict';
  
  toastr.options = {
      "closeButton": true,
      // "debug": true,
      "positionClass": "toast-top-center",
      "onclick": null,
      "showDuration": "1000",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
  };
  
  function info(content) {
      toastr.info(content, '信息');
  }
  
  function success(content) {
      toastr.success(content, '成功');
  }
  
  function error(content) {
      toastr.error(content, '错误');
  }
  
  function warning(content) {
      toastr.warning(content, '警告');
  }
  
  module.exports = {
      info: info,
      success: success,
      error: error,
      warning: warning
  };

});
