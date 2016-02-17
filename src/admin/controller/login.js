'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    /**
     * index action
     * @return {Promise} []
     */
    async loginAction() {
        if (this.isGet()) {
            return this.fail("not post");
        }

        let result = await this.model('user').where('1=1').find();

        return this.success(result);
    }
}