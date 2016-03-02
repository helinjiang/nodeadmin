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
        // 只允许post操作
        this.allowMethods = "post";

        // 其他规则
        // TODO 发现这个貌似没有起效果
        this.rules = {
            tableName: "required",
            targetName: "required",
            menuId: "required",
            breadcrumb: "required",
            state: "required"
        };
    }

    modifyAction() {
        // 只允许post操作
        this.allowMethods = "post";

        // 其他规则
        this.rules = {
            id: "required",
            targetName: "required",
            menuId: "required",
            breadcrumb: "required",
            state: "required"
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
