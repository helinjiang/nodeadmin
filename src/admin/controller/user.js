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
     * 获得数据库表think_user中所有的用户信息
     * @return {object} JSON 格式数据
     */
    async getdataAction() {
        // 查询数据库，获取所有的用户信息
        let data = await this.model('user').order({
            id: "DESC",
        }).select();

        // 为了最后的显示，进行数据处理
        data = data.map(item => {
            // 转义时间
            item.createTime = this.getCurTimeStr(item.createTime);
            item.updateTime = this.getCurTimeStr(item.updateTime);
            item.birthday = this.getCurDateStr(item.birthday);

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

        // 成功返回
        return this.success(data);
    }

    /**
     * 新增数据到数据库表think_user中
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

        // 参数校验，在logic中已完成

        // 保存
        return this._save(record);

    }

    /**
     * 修改数据到数据库表think_user中
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

        // 参数校验，在logic中已完成

        // 保存
        return this._save(record);

    }

    async deleteAction() {
        if (this.isGet()) {
            return this.fail('Not Post');
        }

        let id = this.post('id');
        let model = this.model("user");

        let affectedRows = await model
            .where({
                id: id
            })
            .delete()
            // .catch(err => this.fail(err.message || 'error'));
            .catch(err => {
                // TODO 由于它是外键，因此如果存在记录情况下，直接删除的话SQL会报错
                console.error('===', err);
                console.error('===', err.message);
                console.error('===', err.errno);
                this.fail(err.message || 'error')
            });


        // console.log('--', affectedRows);

        if (affectedRows) {
            return this.success({
                _type: 'delete',
                id: id,
                affectedRows: affectedRows
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

        let model = this.model('user');


        if (!id) {
            // 新增，同时保证 name 值不重复
            let result = await model
                .thenAdd(record, {
                    name: name
                })
                .catch(err => this.fail(err.message || 'error'));

            // 新增结果
            if (result.type === 'add') {
                return this.success({
                    _type: result.type,
                    id: result.id,
                    name: name
                });
            } else {
                return this.fail(100, 'fail', {
                    _type: result.type,
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
            }else {
                return this.fail('modify failed');
            }
        }
    }

}
