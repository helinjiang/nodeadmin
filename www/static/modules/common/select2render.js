define('modules/common/select2render', function(require, exports, module) {

  /**
   * 本文件用于select2控件时，转义CGI接口返回的数据格式的。
   * 在select2中，key值name为'id'，value值name为'text'
   */
  
  'use strict';
  
  function getgroup(res) {
      if (res.errno !== 0) {
          return [];
      }
  
      return res.data;
  }
  
  function searchuser(res) {
      if (res.errno !== 0) {
          return [];
      }
  
      return _convert(res.data, 'id', 'name');
  }
  
  function _convert(arr, idName, textName) {
      if (!Array.isArray(arr)) {
          return [];
      }
  
      return arr.map(function (item) {
          return {
              id: item[idName],
              text: item[textName]
          };
      });
  }
  
  module.exports = {
      getgroup: getgroup,
      searchuser: searchuser
  };

});
