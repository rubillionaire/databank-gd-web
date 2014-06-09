module.exports = function ClassModel (context) {
    var self = {};
    var type = 'class';
    var id;
    var title;
    var educators = [];
    var resources = [];

    var key_finder = context.last_key()
                            .type('class');

    key_finder.dispatcher
        .on('found', function (last_key) {
            id = last_key + 1;
        });

    self.id = function () {
        return id;
    };

    self.title = function (x) {
        if (!arguments.length) return title;
        title = x;
        return self;
    };

    self.educators = function () {
        return educators;
    };
    self.educators.add = function (educator_id) {
        if (!arguments.length) throw "Need educator_id";
        
        var in_educators = false;
        educators.forEach(function (d, i) {
            if (d === educator_id) {
                in_educators = true;
            }
        });

        if (!in_educators) {
            educators.push(educator_id);
        }

        return self;
    };
    self.educators.remove = function (educator_id) {
        if (!arguments.length) throw "Need educator_id";
        var index_to_remove;
        educators.forEach(function (d, i) {
            if (d === educator_id) {
                index_to_remove = i;
            }
        });
        if (index_to_remove) {
            educators.splice(index_to_remove, 1);
        }
        return self;
    };

    self.resources = function () {
        return resources;
    };
    self.resources.add = function (resource_id) {
        if (!arguments.length) throw "Need resource_id";

        var in_resources = false;
        resources.forEach(function (d, i) {
            if (d === resource_id) {
                in_resources = true;
            }
        });

        if (!in_resources) {
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
                type: type,
                id: id,
                title: title,
                educators: educators,
                resources: resources
            };
        }

        id = x.id || undefined;
        title = x.title || '';
        educators = x.educators || [];
        resources = x.resources || [];

        return self;
    };

    self.load = function () {
        if (!self.id()) return key_finder.find(self.load);
        
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
        if (!self.id()) return key_finder.find(self.save);

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
        return 'class!' + self.id();
    }

    return self;
};