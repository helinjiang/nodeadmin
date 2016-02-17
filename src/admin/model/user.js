'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 数据表字段定义
     * @type {Object}
     */
    // schema: {
    //     view_nums: { //阅读数
    //         default: 0 //默认为 0
    //     },
    //     fullname: { //全名
    //         default: function() { //first_name 和 last_name 的组合，这里不能用 Arrows Function
    //             return this.id + this.name;
    //         }
    //     }
    // },

    getUserList() {
        return this.select();
    }
}
