module.exports = function lastKey (context) {
    var self     = {};
    var type     = '';
    var last_key;

    self.dispatcher = context.dispatcher();

    self.type = function (x) {
        if (!arguments.length) return type;
        type = x;
        return self;
    };

    self.find = function (callback) {
        last_key = 0;

        context.datastore.createReadStream({
            start : type + '!',
            end   : type + '!~',
            keys  : true,
            values: false
        }).on('data', function (data) {
            console.log(data);
            var current_id = parseInt(data.split('!')[1], 10);
            if (current_id > last_key) {
                last_key = current_id;
            }
        }).on('end', function () {
            self.dispatcher.emit('found', last_key);
            callback();
        });

        return self;
    };

    self.last = function () {
        return last;
    };

    return self;
};