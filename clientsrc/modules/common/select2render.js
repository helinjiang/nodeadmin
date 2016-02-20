function getgroup(res) {
    if (res.errno !== 0) {
        return [];
    }

    return res.data;
}

function searchuser(res) {
    if (res.errno !== 0) {
        return [];
    }

    return _convert(res.data,'id','name');
}

function _convert(arr, idName, textName) {
    if (!Array.isArray(arr)) {
        return [];
    }

    return arr.map(function(item) {
        return {
            id: item[idName],
            text: item[textName]
        }
    });
}

module.exports = {
    getgroup: getgroup,
    searchuser:searchuser
};
