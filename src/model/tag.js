// Tags are indexed by an escaped tag name
// this way, tags are normalized, and there
// will be no duplicate tags.

// 'tag!graphic-design' = { tag: 'Graphic Design'}

module.exports = function TagModel () {
    var self = {};
    var name;
    var resources = [];

    self.id = function () {
        return tag_to_id(name);
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

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id: self.id(),
                name: name,
                resources: resources
            };
        }

        id = x.id;
        name = x.name;
        resources = x.resources;

        return self;
    };

    function tag_to_id (t) {
        return t.toLowerCase().replace(/ /g, '-');
    }

    return self;
};