module.exports = {
    object_to_array: function (obj) {
        var arr = [];
        for (var key in obj) {
            arr.push(obj[key]);
        }
        return arr;
    }
};