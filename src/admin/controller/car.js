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
        // console.log(this.model('car').getSchema());
        if (this.isGet()) {
            return this.fail('Not Post');
        }
        // datatables的第几次渲染，从1递增，可用于在异步请求下，区分当前返回的数据是第几次请求返回的。
        let draw = this.post('draw');

        // 第几条数据开始
        let start = this.post('start');

        // 一次请求多少条记录
        let length = this.post('length');

        // 快速搜索框中的值
        let searchValue = this.post('search[value]');

        // 由于thinkjs中是以页为单位的，因此在此进行换算
        // https://thinkjs.org/zh-cn/doc/2.1/model_crud.html#toc-6ce
        let page = start / length + 1;


        let result = await this.model('car')
            // .join("think_user ON think_car.ownerId=think_user.id")
            .alias("c")
            // .join({
            //     table: "user",
            //     join: "left", //join 方式，有 left, right, inner 3 种方式
            //     as: "u", // 表别名
            //     on: ["ownerId", "id"] //ON 条件
            // })
            .join({
                table: "select id as user_id, name as user_name from think_user",
                as: "u", // 表别名
                on: ["ownerId", "user_id"] //ON 条件
            })
            .order({
                'c.id': "DESC",
            })
            .page(page, length)
            .countSelect();

        console.log(result);

        let data = result.data;

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

        // TODO 注意，此处由于datatables的限制，只能使用this.json方法
        // return this.success(data);
        return this.json({
            draw: draw,
            recordsTotal: result.count,
            recordsFiltered: result.count, // TODO 此处还没考虑搜索条件
            data: data
        });
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


    async deleteAction() {
        if (this.isGet()) {
            return this.fail('Not Post');
        }

        let id = this.post('id');
        let model = this.model("car");

        let affectedRows = await model
            .where({
                id: id
            })
            .delete()
            .catch(err => this.fail(err.message || 'error'));

        if (affectedRows) {
            return this.success({
                _type: 'delete',
                id: id,
                affectedRows: affectedRows
            });
        }
    }

}
