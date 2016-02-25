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

    getdataAction() {
        // 只允许post操作
        this.allowMethods = "post";
    }

    addAction() {
        // 只允许post操作
        this.allowMethods = "post";

        // 其他规则
        this.rules = {
            name: "required",
            ownerId: "required",
            state: "required",
            buydate: "required"
        };
    }

    modifyAction() {
        // 只允许post操作
        this.allowMethods = "post";

        // 其他规则
        this.rules = {
            id: "required",
            ownerId: "required",
            state: "required",
            buydate: "required"
        };
    }

    deleteAction() {
        // 只允许post操作
        this.allowMethods = "post";

        // 其他规则
        this.rules = {
            id: "required"
        };
    }
}
