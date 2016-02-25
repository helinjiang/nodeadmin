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
     * 获得数据库表 think_car 中所有的用户信息
     * 
     * @return {object} JSON 格式数据
     */
    async getdataAction() {
        // 获取参数
        let {
            // datatables的第几次渲染，从1递增，可用于在异步请求下，区分当前返回的数据是第几次请求返回的。
            draw, 

            // 第几条数据开始
            start, 

            // 一次请求多少条记录
            length
        } = this.post();

        // 快速搜索框中的值
        // TODO 还未实现
        let searchValue = this.post('search[value]');

        // 由于thinkjs中是以页为单位的，因此在此进行换算
        // https://thinkjs.org/zh-cn/doc/2.1/model_crud.html#toc-6ce
        let page = start / length + 1;

        // 查询数据库，获取所有的汽车信息
        let result = await this.model('car')
            .alias("c")
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

        // 为了最后的显示，进行数据处理
        let data = result.data.map(item => {
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

    /**
     * 新增数据到数据库表 think_car 中
     * 
     * @return {object} JSON 格式数据
     */
    addAction() {
        // 获取参数
        let {
            name, ownerId, state, buydate
        } = this.post();

        let record = {
            name: name,
            ownerId: ownerId,
            state: state,
            buydate: buydate
        };

        // 参数校验，在logic中已完成

        // 保存
        return this._save(record);

    }

    /**
     * 修改数据到数据库表 think_car 中
     * 
     * @return {object} JSON 格式数据
     */
    modifyAction() {
        // 获取参数
        let {
            id, ownerId, state, buydate
        } = this.post();

        let datetime = this.getCurTimeStr();

        let record = {
            id: id,
            ownerId: ownerId,
            state: state,
            buydate: buydate
        };

        // 参数校验，在logic中已完成

        // 保存
        return this._save(record);

    }

    /**
     * 从数据库表 think_car 中删除一条记录
     *
     * @return {object} JSON 格式数据
     */
    async deleteAction() {
        // 获取参数
        let id = this.post('id');
        let model = this.model("car");

        // 参数校验，在logic中已完成

        // TODO 检查外键情况，查询是否有其他的数据表有用到该数据

        // 删除
        let affectedRows = await model
            .where({
                id: id
            })
            .delete()
            .catch(err => {
                return this.fail(err.message || 'error')
            });

        // 处理返回结果
        if (affectedRows) {
            return this.success({
                _type: 'delete',
                affectedRows: affectedRows,
                id: id
            });
        } else {
            return this.fail('delete failed!', {
                _type: 'delete',
                id: id
            });
        }
    }

    /**
     * 保存数据
     */
    async _save(record) {
        let {
            id, name
        } = record;

        let model = this.model('car');


        if (!id) {
            // 新增，同时保证 name 值不重复
            let result = await model
                .thenAdd(record, {
                    name: name
                })
                .catch(err => {
                    return this.fail(err.message || 'error');
                });

            // 处理返回结果
            if (result.type === 'add') {

                return this.success({
                    _type: result.type,
                    record
                });
            } else {
                return this.fail('already exist same name!', {
                    _type: result.type,
                    record
                });
            }
        } else {
            // 修改
            // TODO 修改的时候没考虑name重名情况
            let affectedRows = await model
                .where({
                    id: id
                })
                .update(record)
                .catch(err => {
                    return this.fail(err.message || 'error');
                });

            // 处理返回结果
            if (affectedRows) {
                return this.success({
                    _type: 'modify',
                    affectedRows: affectedRows,
                    record
                });
            } else {
                return this.fail('modify failed!', {
                    _type: 'modify',
                    record
                });
            }
        }
    }

}
