'use strict';
/**
 * model
 */
export default class extends think.model.base {  
    getAllUser() {
        return this.order({
            id: "DESC",
        }).select();
    }
}
