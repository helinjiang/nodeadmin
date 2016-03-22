'use strict';

import BaseCrud from './basecrud.js';

export default class extends BaseCrud {
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
        let data = this.convertToDatagrid(result.data, item => {
            // 购买日期
            item.buydate = this.getCurDateStr(item.buydate);

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

        let model = this.model("car");

        // 参数校验，在logic中已完成

        // 保存
        return this.saveToDB(model, record, {
            keyId: 'id',
            uniqueCheck: {
                name: record.name
            }
        });

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

        let model = this.model("car");

        // 参数校验，在logic中已完成

        // 保存
        return this.saveToDB(model, record, {
            keyId: 'id'
        });

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
        return this.deleteFromDB(model, {
            id: id
        });
    }
}
