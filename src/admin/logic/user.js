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

    addAction() {
        console.log('logic addAction');
        // 只允许post操作
        this.allowMethods = "post";

        // 其他规则
        this.rules = {
            name: "required",
            pwd: "required",
            state: "required",
            birthday: "required"
        };
    }

    modifyAction() {
        console.log('logic addAction');
        // 只允许post操作
        this.allowMethods = "post";

        // 其他规则
        this.rules = {
            id: "required",
            name: "required",
            state: "required",
            birthday: "required"
        };
    }
}
