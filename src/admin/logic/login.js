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
    indexAction() {

    }

    loginAction() {
        // 只允许post操作
        // https://thinkjs.org/zh-cn/doc/2.1/logic.html#toc-b1c
        this.allowMethods = "post";

        // 其他规则
        // https://thinkjs.org/zh-cn/doc/2.1/logic.html#toc-54a
        this.rules = {
            username: "required",
            password: "required"
        };
    }
}