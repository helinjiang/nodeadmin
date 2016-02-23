'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file test_index.html
        return this.display();
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
            };
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
