module.exports = function ResourceModel (context) {
    var self = {};

    var type = 'resource';
    var id;
    var versions   = [];
    var educators  = [];
    var classes    = [];

    console.log('last key');
    console.log(context.last_key);

    var key_finder = context.last_key()
                            .type('class');

    key_finder.dispatcher
        .on('found', function (last_key) {
            id = last_key + 1;
        });

    self.id = function () {
        return id;
    };

    self.versions = function () {
        return versions;
    };
    self.versions.add = function (resource) {
        // resources are not unique.
        // the view ensures a change has occured
        // before passing a new version in
        versions.push(resource);
        return self;
    };
    self.versions.get = function (version_id) {
        // don't make the user think about the fact
        // that counting starts from 0. Because
        // there will never be a version 0.
        if (version_id > versions.length) return undefined;
        
        return versions[version_id-1];
    };
    self.versions.count = function () {
        return versions.length;
    };
    self.versions.latest = function () {
        return self.versions.get(self.versions.count());
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

    self.classes = function () {
        return classes;
    };
    self.classes.add = function (class_id) {
        if (!arguments.length) throw "Need class_id";

        var in_classes = false;
        classes.forEach(function (d, i) {
            if (d === class_id) {
                in_classes = true;
            }
        });

        if (!in_classes) {
            classes.push(class_id);
        }

        return self;
    };
    self.classes.remove = function (class_id) {
        if (!arguments.length) throw "Needs class_id";

        var index_to_remove;
        classes.forEach(function (d, i) {
            if (d === class_id) {
                index_to_remove = i;
            }
        });

        if (index_to_remove) {
            classes.splice(index_to_remove, 1);
        }

        return self;
    };

    self.tags = function () {
        var tags = [];
        versions.forEach(function (d, i) {
            tags = tags.concat(d.tags);
        });
        return get_unique(tags);
    };

    self.dispatcher = context.dispatcher();

    self.data = function (x) {
        if (!arguments.length) {
            return {
                type      : type,
                id        : id,
                versions  : self.versions(),
                educators : self.educators(),
                tags      : self.tags(),
                classes   : self.classes()
            };
        }

        id        = x.id || undefined;
        versions  = x.versions || [];
        educators = x.educators || [];
        classes   = x.classes || [];

        return self;
    };

    function get_unique (arr) {
        var u = {};
        var a = [];

        for (var i = 0; i < arr.length; i++) {
            if (u.hasOwnProperty(arr[i])) {
                continue;
            }
            a.push(arr[i]);
            u[arr[i]] = 1;
        }

        return a;
    }

    self.load = function () {
        if (!self.id()) return key_finder.find(self.load);

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
        return 'resource!' + self.id();
    }

    return self;
};