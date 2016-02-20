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
        let data = await this.model('user').getAllUser();

        data.map(item => {
            // 转义时间
            item.createTime = this.getCurTimeStr(item.createTime);
            item.updateTime = this.getCurTimeStr(item.updateTime);

            // 为表格中的每一行增加id：DT_RowId，以便后续方便操作
            item.DT_RowId = 'row_' + item.id;

            if (item.state < 0) {
                // 为表格中的无效数据增加样式：DT_RowClass，默认值有'active', 'success', 'warning', 'danger'，也可以自定义
                item.DT_RowClass = 'warning';
            }

            return item;
        });

        return this.success(data);
    }

    async saveAction() {
        let {
            id, name, pwd
        } = this.post();

        //console.log(title, theme, slide_content); 
        let model = this.model("user");
        let datetime = this.getCurTimeStr();

        pwd = think.md5('think_' + pwd);

        let record = {
            name: name,
            pwd: pwd,
            createTime: datetime,
            updateTime: datetime,
            state: 1
        };
        console.log(record);
        // return this.success('test');

        if (!id) {
            // 新增
            id = await model
                .add(record)
                .catch(err => this.fail(err.message || 'error'));

            if (id) {
                return this.success({
                    _type: 'add',
                    id: id,
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
                return this.success(id);
            }
        }
    }


    /**
     * 获得用户组值
     */
    getgroupAction() {
        let data = [{
            id: 1,
            name: '管理员'
        }, {
            id: 2,
            name: '普通用户'
        }, {
            id: 3,
            name: '游客'
        }]

        return this.success(data);
    }
}
