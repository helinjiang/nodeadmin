var BaseModel = require('common/model');

class Model extends BaseModel {

}

module.exports = new Model([
    'id',
    'createTime',
    'updateTime',
    'state',
    'stateShow'
], {
    'name': '用户名',
    'pwd': '密码',
    'birthday': '生日'
});
