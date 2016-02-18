define('modules/common/render', function(require, exports, module) {

  'use strict';
  
  function _getRenderModify(id) {
      return '<button class="btn btn-info action" data-type="modify" data-id="' + id + '"> 修改 </button>';
  }
  
  function _getRenderDelete(id) {
      return '<button class="btn btn-danger action" data-type="delete" data-id="' + id + '"> 删除 </button>';
  }
  
  function _getRenderDetail(id) {
      return '<button class="btn btn-info action" data-type="detail" data-id="' + id + '"> 详情 </button>';
  }
  
  function commonOperate(renderParam, data, type, full) {
      var result = [],
          paramArr;
  
      if (!renderParam) {
          return data;
      }
  
      paramArr = renderParam.trim().replace(/\s+/g, ' ').split(' ');
  
      paramArr.forEach(function (item) {
          switch (item) {
              case 'modify':
                  result.push(_getRenderModify(data));
                  break;
              case 'delete':
                  result.push(_getRenderDelete(data));
                  break;
              case 'detail':
                  result.push(_getRenderDetail(data));
                  break;
              default:
                  break;
          }
      });
  
      return result.join('');
  }
  
  module.exports = {
      commonOperate: commonOperate
  };

});
