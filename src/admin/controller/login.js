'use strict';

import Base from './base.js';

export default class extends Base {
    async __before() {

        /**
         * 注意这里要重写，因为在Base中我们限定了如果没登录则跳转到登录页面的代码,
         * 如果此处不重写，则会陷入到循环中
         */

    }

    /**
     * 展示登录页面
     */
    async indexAction() {
        let userInfo = await this.session('userInfo');

        // 如果已经登录了，则直接调转到后台首页
        if (!think.isEmpty(userInfo)) {
            return this.redirect('/admin');
        }

        return this.display();
    }

    /**
     * 登录校验
     * 
     * @return {object} JSON结果
     */
    async loginAction() {
        // 参数校验，在logic中已完成

        // 获得请求中数据
        let {
            username, password
        } = this.post();

        // md5加密
        let md5 = think.md5('think_' + password);

        // 在数据库中搜索
        let result = await this.model('user').where({
            name: username,
            pwd: md5
        }).find();

        // 如果登录失败，则返回失败
        if (think.isEmpty(result)) {
            return this.fail('login fail');
        }

        // 如果成功，则保存用户信息
        await this.session('userInfo', result);

        // 返回成功
        return this.success(result.name);
    }


    /**
     * 退出登录
     */
    async logoutAction() {
        // 清除相关session
        await this.session('userInfo', '');

        // 直接跳转到登录页
        return this.redirect('/admin/login');
    }
}
