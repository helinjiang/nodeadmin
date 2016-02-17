define('modules/common/render', function(require, exports, module) {

  "use strict";
  
  function operate(data, type, full) {
    return JSON.stringify(data);
  }
  
  module.exports = {
    operate: operate
  };

});
