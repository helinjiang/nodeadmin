var BaseModel = require('common/model');

class Model extends BaseModel {

}


module.exports = new Model([
    'id',
    'state',
    'stateShow'
], {
    'user_name': '车主人',
    'name': '汽车名字',
    'buydate': '购买日期'
});
