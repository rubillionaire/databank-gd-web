module.exports = function ResourceModel () {
    var self = {};

    var id;
    var versions = [];
    var authors  = [];
    var classes  = [];

    self.id = function () {
        return id;
    };

    self.versions = {};
    self.versions.add = function (resource) {
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

    self.authors = function () {
        return authors;
    };
    self.authors.add = function (author_id) {
        if (!arguments.length) throw "Need author_id";

        var in_authors = false;
        authors.forEach(function (d, i) {
            if (d === author_id) {
                in_authors = true;
            }
        });

        if (!in_authors) {
            authors.push(author_id);
        }

        return self;
    };
    self.authors.remove = function (author_id) {
        if (!arguments.length) throw "Need author_id";
        var index_to_remove;
        authors.forEach(function (d, i) {
            if (d === author_id) {
                index_to_remove = i;
            }
        });
        if (index_to_remove) {
            authors.splice(index_to_remove, 1);
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

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id      : id,
                versions: versions,
                authors : authors,
                tags    : tags,
                classes : classes
            };
        }

        id       = x.id;
        versions = x.versions;
        authors  = x.authors;
        tags     = x.tags;
        classes  = x.classes;

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

    return self;
};