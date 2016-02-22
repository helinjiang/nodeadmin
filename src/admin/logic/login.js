'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  indexAction(){
   
  }

  loginAction() {
    this.allowMethods = "post"; //只允许 GET 和 POST 请求类型

    this.rules = {
      username: "required|length:2,5"
    };
  }
}