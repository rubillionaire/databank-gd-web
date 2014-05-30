module.exports = function EducatorModel () {
    var self = {};
    var email;
    var first_name = '';
    var last_name  = '';


    self.id = function () {
        return email_to_id(email);
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

    self.data = function (d) {
        if (!arguments.length) {
            return {
                id        : email_to_id(email),
                email     : email,
                first_name: first_name,
                last_name : last_name
            };
        }

        id         = d.id;
        email      = d.email;
        first_name = d.first_name;
        last_name  = d.last_name;

        return self;
    };

    function email_to_id (e) {
        return e.toLowerCase();
    }

    return self;
};