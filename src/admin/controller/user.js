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
     * 获得数据库表 think_user 中所有的用户信息
     * 
     * @return {object} JSON 格式数据
     */
    async getdataAction() {
        // 查询数据库，获取所有的用户信息
        let data = await this.model('user').order({
            id: "DESC",
        }).select();

        // 为了最后的显示，进行数据处理
        data = this.convertToDatagrid(data, item => {
            // 生日
            item.birthday = this.getCurDateStr(item.birthday);

            return item;
        });

        // 成功返回
        return this.success(data);
    }

    /**
     * 新增数据到数据库表 think_user 中
     * 
     * @return {object} JSON 格式数据
     */
    addAction() {
        // 获取参数
        let {
            name, pwd, state, birthday
        } = this.post();

        let datetime = this.getCurTimeStr();

        pwd = think.md5('think_' + pwd);

        let record = {
            name: name,
            pwd: pwd,
            createTime: datetime,
            updateTime: datetime,
            state: state,
            birthday: birthday
        };

        let model = this.model("user");

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
     * 修改数据到数据库表 think_user 中
     * 
     * @return {object} JSON 格式数据
     */
    modifyAction() {
        // 获取参数
        let {
            id, name, state, birthday
        } = this.post();

        let datetime = this.getCurTimeStr();

        let record = {
            id: id,
            name: name,
            updateTime: datetime,
            state: state,
            birthday: birthday
        };

        let model = this.model("user");

        // 参数校验，在logic中已完成

        // 保存
        return this.saveToDB(model, record, {
            keyId: 'id'
        });

    }

    /**
     * 从数据库表 think_user 中删除一条记录
     *
     * @return {object} JSON 格式数据
     */
    deleteAction() {
        // 获取参数
        let id = this.post('id');
        let model = this.model("user");

        // 参数校验，在logic中已完成

        // TODO 检查外键情况，查询是否有其他的数据表有用到该数据

        // 删除
        return this.deleteFromDB(model, {
            id: id
        });
    }
}
