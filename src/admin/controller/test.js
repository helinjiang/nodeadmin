'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file test_index.html
    return this.display();
  }

  /**
   * 调用模版进行渲染
   * @return {Promise} []
   */
  showmeAction(){
    this.assign({
          data: {
            'name':'TFBoy',
            'age':20
          }
    });

    return this.display('showme');
  }

  /**
   * 测试获取请求参数
   * @return {Promise} []
   */
  paramAction(){
    let param = this.get();
    return this.success(param);
  }
}