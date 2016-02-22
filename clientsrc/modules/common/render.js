function _getRenderModify(id) {
    return '<button class="btn btn-info action" data-type="modify" data-id="' + id + '"> 修改 </button>';
}

function _getRenderDelete(id) {
    return '<button class="btn btn-danger action" data-type="delete" data-id="' + id + '"> 删除 </button>';
}

function _getRenderDetail(id) {
    return '<button class="btn btn-info action" data-type="detail" data-id="' + id + '"> 详情 </button>';
}

/**
 * 用在datagriditem组件中的render属性，用法例如：render="commonOperate | detail modify delete"
 * 其中的detail、modify、delete是按钮的名称，整个含义就是返回这三个按钮
 * 
 * @param  {string} renderParam 渲染的额外参数
 * @param  {string} data        datatables的data字段，该列对象其中的一个key值
 * @param  {string} type        datatables的type字段
 * @param  {object} full        datatables中该列对象的所有数据
 * @return {string}             包含了按钮的html代码
 */
function commonOperate(renderParam, data, type, full) {
    var result = [],
        paramArr;

    if (!renderParam) {
        return data;
    }

    paramArr = renderParam.trim().replace(/\s+/g, ' ').split(' ');

    paramArr.forEach(function(item) {
        switch (item) {
            case 'modify':
                result.push(_getRenderModify(data));
                break;
            case 'delete':
                result.push(_getRenderDelete(data));
                break;
            case 'detail':
                result.push(_getRenderDetail(data));
                break;
            default:
                break;
        }
    });

    return result.join('');
}

module.exports = {
    commonOperate: commonOperate
};
