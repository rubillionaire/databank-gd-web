// Tracks Educator logged in state, and
// keeps a reference to their Educator id

module.exports = function MeModel (context) {
    var self = {};
    var authenticated = false;

    var type = 'me';
    var id;
    var classes   = [];
    var resources = [];

    self.id = function () {
        return id;
    };

    self.authenticated = function (x) {
        if (!arguments.length) return authenticated;
        authenticated = x;
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
        if (!arguments.length) throw "Need class_id";

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

    self.resources = function () {
        return resources;
    };

    self.dispatcher = context.dispatcher();

    self.data = function (x) {
        if (!arguments.length) {
            return {
                type     : type,
                id       : id,
                classes  : classes,
                resources: resources
            };
        }

        if (typeof x === "object") {
            id = x.id || undefined;
            classes   = x.classes || [];
            resources = x.resources || [];
        }

        return self;
    };

    self.save = function () {
        context.datastore.local.set('me', 'me', self.data());
        self.dispatcher.emit('saved');
        return self;
    };

    self.load = function () {
        self.data(context.datastore.local.get('me', 'me'));
        self.dispatcher.emit('loaded');
        return self;
    };

    return self;
};