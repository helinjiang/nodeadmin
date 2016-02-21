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

        return this.success(data);
    }

    async saveAction() {
        if (this.isGet()) {
            return this.fail('Not Post');
        }

        let {
            id, name, pwd, state, birthday
        } = this.post();

        let model = this.model("user");
        let datetime = this.getCurTimeStr();

        pwd = think.md5('think_' + pwd);

        let record = {
            name: name,
            pwd: pwd,
            updateTime: datetime,
            state: state,
            birthday: birthday
        };
        console.log(record);
        // return this.success('test');

        if (!id) {
            // 新增
            record.createTime = datetime;

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
        let model = this.model("user");

        let affectedRows = await model
            .where({
                id: id
            })
            .delete()
            // .catch(err => this.fail(err.message || 'error'));
            .catch(err => {
                // TODO 由于它是外键，因此如果存在记录情况下，直接删除的话SQL会报错
                console.error('===',err);
                console.error('===',err.message);
                console.error('===',err.errno);
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
        }];

        // 可以在后台直接返回select2的数据，也可以前端再转化
        data = data.map(function(item) {
            return {
                id: item.id,
                text: item.name
            }
        });

        return this.success(data);
    }

    /**
     * 搜索用户
     */
    async searchuserAction() {
        let {
            q
        } = this.get();

        //console.log(title, theme, slide_content); 
        let model = this.model("user");

        let data = await model.where({
            'name': ["like", "%" + q + "%"]
        }).select();

        console.log(data);

        return this.success(data);
    }
}
