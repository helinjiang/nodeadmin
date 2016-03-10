var Model = require('common/model');

class UserModel extends Model {

}

module.exports = new UserModel([
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
