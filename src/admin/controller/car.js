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
     * 获得列表中的数据
     * @return {object} JSON 格式数据
     */
    async getdataAction() {
        let data = await this.model('car').order({
            id: "DESC",
        }).select();

        data = data.map(item => {
            // 转义时间
            item.buydate = this.getCurDateStr(item.buydate);

            // 为表格中的每一行增加id：DT_RowId，以便后续方便操作
            item.DT_RowId = 'row_' + item.id;

            if (item.state < 0) {
                // 为表格中的无效数据增加样式：DT_RowClass，默认值有'active', 'success', 'warning', 'danger'，也可以自定义
                item.DT_RowClass = 'warning';
                item.stateShow = '无效';
            } else {
                item.stateShow = '有效';
            }

            return item;
        });

        return this.success(data);
    }
}
