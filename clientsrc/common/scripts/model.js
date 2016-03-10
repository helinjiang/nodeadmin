var data = {
    'id': 'ID',
    'name': '名字',
    'createTime': '创建时间',
    'updateTime': '更新时间',
    'state': '状态',
    'stateShow': '状态'
};


function getNameMap(arr) {
    var map = {};

    arr.forEach(function(fieldName) {
        if (typeof data[fieldName] !== 'undefined') {
            map[fieldName] = data[fieldName];
        }
    });

    return map;
}

module.exports = {
    data: data,
    getNameMap: getNameMap

};
