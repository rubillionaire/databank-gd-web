// Tags are not included at the moment
// would need to revisit its interfaces
// to ensure its on the same page as
// the other models.

module.exports = function TagModel (context) {
    var self = {};
    var type = 'tag';
    var id;
    var name;
    var resources = [];

    self.id = function () {
        return id ? id : tag_to_id(self.name());
    };

    self.name = function () {
        return name;
    };

    self.resources = function () {
        return resources;
    };
    self.resources.add = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var clean = false;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                clean = true;
            }
        });

        if (!clean) {
            resources.push(resource_id);
        }

        return self;
    };
    self.resources.remove = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var index_to_remove;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                index_to_remove = i;
            }
        });

        if (index_to_remove) {
            resources.splice(index_to_remove, 1);
        }

        return self;
    };

    self.dispatcher = context.dispatcher();

    self.data = function (x) {
        if (!arguments.length) {
            return {
                type     : type,
                id       : self.id(),
                name     : name,
                resources: resources
            };
        }

        id        = x.id || undefined;
        name      = x.name || '';
        resources = x.resources || '';

        return self;
    };

    function tag_to_id (t) {
        return t.toLowerCase().replace(/ /g, '-');
    }

    self.load = function () {
        if (!self.id()) return determine_id(self.load);

        context
            .datastore
            .get(datastore_id(),
                function (err, value) {
                    if (err) {
                        var msg = 'Error loading Resource: ' + err;
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
        return 'tag!' + self.id();
    }

    function determine_id(callback) {
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