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

        // 为表格中的每一行增加id：DT_RowId，增加样式：DT_RowClass

        return this.success(data);
    }
}
