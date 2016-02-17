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

    async getdataAction() {
        let data = await this.model('user').getAllUser();
        return this.success(data);
    }
}