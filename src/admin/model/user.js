'use strict';
/**
 * model
 */
export default class extends think.model.base {  
    findUser(name, pwd){
        return this.where({name: name, pwd: pwd}).find();
    }

    getAllUser() {
        return this.select();
    }
}
