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

    async saveAction() {
        if (this.isGet()) {
            return this.fail('Not Post');
        }

        // return this.success(this.post());

        let {
            id, name, ownerId, state, buydate
        } = this.post();

        let model = this.model("car");

        let record = {
            name: name,
            ownerId: ownerId,
            state: state,
            buydate: buydate
        };
        console.log(record);
        // return this.success('test');

        if (!id) {
            // 新增
            // result returns {id: 1000, type: "add"} or {id: 1000, type: "exist"} } }
            let result = await model
                .thenAdd(record, {
                    name: name
                })
                .catch(err => this.fail(err.message || 'error'));

            console.log(result);

            if (result.type === 'add') {
                return this.success({
                    _type: 'add',
                    id: result.id,
                    name: name
                });
            } else {
                return this.fail(100, 'fail', {
                    _type: 'exist',
                    id: result.id,
                    name: name
                });
            }
        } else {
            // 修改
            let affectedRows = await model
                .where({
                    id: id
                })
                .update(record)
                .catch(err => this.fail(err.message || 'error'));

            if (affectedRows) {
                return this.success({
                    _type: 'modify',
                    id: id,
                    name: name
                });
            }
        }
    }
}
