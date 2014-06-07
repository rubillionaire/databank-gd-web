module.exports = function EducatorModel (context) {
    var self = {};
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
                id        : email_to_id(email),
                email     : email,
                first_name: first_name,
                last_name : last_name
            };
        }

        id = x.id;

        if (('email'in x) &&
            ('first_name'in x) &&
            ('last_name'in x)) {

            email      = x.email;
            first_name = x.first_name;
            last_name  = x.last_name;

            self.dispatcher.emit('loaded');
        } else {
            load_from_datastore();
        }

        return self;
    };

    function email_to_id (e) {
        return e.toLowerCase();
    }

    self.save = function () {
        context
            .datastore
            .put(datastore_id(),
                self.data(),
                function (err) {
                    if (err) {
                        var msg = 'Error saving Educator: ' + err;
                        return console.log(msg);
                    }
                    self.dispatcher.emit('saved');
                });
        return self;
    };

    function datastore_id () {
        return 'educator!' + self.id();
    }

    function load_from_datastore () {
        context
            .datastore
            .get(datastore_id(),
                function (err, value) {
                    if (err) {
                        var msg = 'Error loading Educator: ' + err;
                        return console.log(msg);
                    }
                    self.data(value);
                });
    }

    return self;
};