'use strict';
import moment from 'moment';

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

    getCurTimeStr(dateObj, formatStr = 'YYYY-MM-DD HH:mm:ss') {
        var result;

        switch (typeof dateObj) {
            case 'object':
                result = moment(dateObj).format(formatStr);
                break;
            case 'undefined':
                result = moment().format(formatStr);
                break;
            case 'string':
                result = dateObj;
                break;
            default:
                result = 'unknown' + dateObj;
                break;
        }

        return result;
    }

    getCurDateStr(dateObj) {
        return this.getCurTimeStr(dateObj, 'YYYY-MM-DD');
    }
}
