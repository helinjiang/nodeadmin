'use strict';
import moment from 'moment';

export default class extends think.controller.base {
    /**
     * 魔术方法，在所有操作之前运行，权限校验
     * https://thinkjs.org/zh-cn/doc/2.1/rest_api.html#toc-81e
     */
    async __before() {
        let userInfo = await this.session('userInfo');

        // 如果没登录，则跳转到登录页面
        if (think.isEmpty(userInfo)) {
            return this.redirect('/admin/login');
        }

        this.assign('user', userInfo);
    }

    /**
     * 获得符合格式的时间字符串
     * 
     * @param  {object|undefined}   dateObj   Date对象，如果是undefined，则为当前时间对象
     * @param  {string}   formatStr 时间格式化定义
     * @return {string}             格式化之后的时间字符串
     */
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

    /**
     * 获得符合格式的日期字符串
     * 
     * @param  {object|undefined}   dateObj   Date对象，如果是undefined，则为当前时间对象
     * @return {string}             格式化之后的日期字符串
     */
    getCurDateStr(dateObj) {
        return this.getCurTimeStr(dateObj, 'YYYY-MM-DD');
    }
}
