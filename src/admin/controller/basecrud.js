'use strict';

import Base from './base.js';

export default class extends Base {

    /**
     * 为了在datagrid中显示，转义一些数据，并返回转义之后的数组
     * @param  {array}   data 数据数组
     * @param  {function} fn   额外的对每个数据的处理，并返回新数据，接受一个item参数
     * @return {array}        转义之后的数组
     */
    convertToDatagrid(data, fn) {
        if (!data || !data.length) {
            return data;
        }

        return data.map(item => {
            // 创建时间
            if (typeof item.createTime !== 'undefined') {
                item.createTime = this.getCurTimeStr(item.createTime);
            }

            // 最后更新时间
            if (typeof item.updateTime !== 'undefined') {
                item.updateTime = this.getCurTimeStr(item.updateTime);
            }

            // 为表格中的每一行增加id：DT_RowId，以便后续方便操作
            item.DT_RowId = 'row_' + item.id;

            // 状态
            if (typeof item.state !== 'undefined') {
                if (item.state < 0) {
                    // 为表格中的无效数据增加样式：DT_RowClass，默认值有'active', 'success', 'warning', 'danger'，也可以自定义
                    item.DT_RowClass = 'warning';
                    item.stateShow = '无效';
                } else {
                    item.stateShow = '有效';
                }
            }

            // 自定义的函数
            if (typeof fn === 'function') {
                item = fn(item);
            }

            return item;
        });
    }

    /**
     * 保存数据
     */
    async saveToDB(model, record, options) {
        if (typeof options !== 'object') {
            return this.fail('internal error');
        }

        // id，该数据表的主键
        let id = record[options.keyId];

        // 唯一性检验
        let uniqueCheck = options.uniqueCheck;

        if (!id) {
            // 新增
            if (typeof uniqueCheck === 'object') {
                // 使用thenAdd
                let result = await model
                    .thenAdd(record, uniqueCheck)
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
                // 使用add
                let result = await model
                    .add(record)
                    .catch(err => {
                        return this.fail(err.message || 'error');
                    });

                // 处理返回结果，返回插入的 ID
                if (result) {
                    return this.success({
                        _type: 'add',
                        result: result,
                        record
                    });
                } else {
                    return this.fail('already exist same name!', {
                        _type: 'add',
                        result: result,
                        record
                    });
                }
            }
        } else {
            // 修改
            let whereObj = {};
            whereObj[options.keyId] = id;

            // TODO 修改的时候没考虑name重名情况
            let affectedRows = await model
                .where(whereObj)
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


    async deleteFromDB(model, whereObj) {
        if (typeof whereObj !== 'object') {
            return this.fail('internal error');
        }

        // 删除
        let affectedRows = await model
            .where(whereObj)
            .delete()
            .catch(err => {
                return this.fail(err.message || 'error');
            });

        // 处理返回结果
        if (affectedRows) {
            return this.success({
                _type: 'delete',
                affectedRows: affectedRows,
                whereObj
            });
        } else {
            return this.fail('delete failed!', {
                _type: 'delete',
                whereObj
            });
        }
    }


}
