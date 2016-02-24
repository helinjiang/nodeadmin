define('modules/components/loading/main', function(require, exports, module) {

  'use strict';
  
  var App = require('modules/common/app');
  
  function show(msg) {
      msg = msg || '加载中...';
      App.blockUI({
          message: msg
      });
  }
  
  function hide() {
      App.unblockUI();
  }
  
  module.exports = {
      show: show,
      hide: hide
  };

});
