module.exports = function ResourceModel () {
    var self = {};
    var id;
    var versions = [];
    var authors = [];

    self.id = function () {
        return id;
    };

    self.versions = {};
    self.versions.add = function (resource) {
        versions.push(resource);
        return self;
    };
    self.versions.get = function (version_id) {
        if (version_id > (versions.length - 1)) return undefined;
        
        return versions[version_id];
    };
    self.versions.count = function () {
        return versions.length;
    };

    self.authors = function () {
        return authors;
    };
    self.authors.add = function (author_id) {
        authors.push(author_id);
        return self;
    };

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id: id,
                versions: versions,
                authors: authors
            };
        }

        id = x.id;
        versions = x.versions;
        authors = x.authors;

        return self;
    };

    return self;
};