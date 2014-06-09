module.exports = function EducatorModel (context) {
    var self = {};
    var type = 'educator';
    var id;
    var email;
    var first_name = '';
    var last_name  = '';


    self.id = function () {
        return id ? id : email_to_id(email);
    };

    self.email = function () {
        return email;
    };

    self.name = function () {
        return ((first_name) ? (first_name + ' ') : '') +
               last_name;
    };

    self.name.first = function () {
        return first_name;
    };

    self.name.last = function () {
        return last_name;
    };

    self.dispatcher = context.dispatcher();

    self.data = function (x) {
        if (!arguments.length) {
            return {
                type      : type,
                id        : email_to_id(email),
                email     : email,
                first_name: first_name,
                last_name : last_name
            };
        }

        id         = x.id || undefined;
        email      = x.email || '';
        first_name = x.first_name || '';
        last_name  = x.last_name || '';

        return self;
    };

    function email_to_id (e) {
        return e.toLowerCase();
    }

    self.load = function () {
        if (!self.id()) return determine_id(self.load);
        
        context
            .datastore
            .get(datastore_id(),
                function (err, value) {
                    if (err) {
                        var msg = 'Error loading Resource: ' +
                                   err;
                        return console.log(msg);
                    }
                    self.data(value);
                    self.dispatcher.emit('loaded');
                });

        return self;
    };

    self.save = function () {
        if (!self.id()) return determine_id(self.save);

        context
            .datastore
            .put(datastore_id(),
                self.data(),
                function (err) {
                    if (err) {
                        var msg = 'Error saving Resource: ' + err;
                        return console.log(msg);
                    }
                    self.dispatcher.emit('saved');
                });
        return self;
    };

    function datastore_id () {
        return 'educator!' + self.id();
    }

    function determine_id (callback) {
            var highest_id = 0;

            db.createReadStream({
                start : type + '!',
                end   : type + '!~',
                keys  : true,
                values: false
            }).on('data', function (data) {
                var current_id = parseInt(data.split('!')[0], 10);
                if (current_id > highest_id) {
                    highest_id = current_id;
                }
            }).on('end', function () {
                // set the value we came to find
                id = highest_id + 1;
                callback();
            });

            return self;
        }

    return self;
};