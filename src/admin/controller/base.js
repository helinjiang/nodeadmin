'use strict';

export default class extends think.controller.base {
    /**
     * some base method in here
     */

    async __before() {
        let userInfo = await this.session('userInfo');

        // 如果没登录，则跳转到登录页面
        if (think.isEmpty(userInfo)) {

            return this.redirect('/admin/login');
        }

        this.assign('user', userInfo);
    }
}