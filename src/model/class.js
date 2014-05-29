module.exports = function ClassModel () {
    var self = {};
    var id;
    var title;
    var authors = [];
    var resources = [];

    self.id = function () {
        return id;
    };

    self.title = function (x) {
        if (!arguments.length) return title;
        title = x;
        return self;
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

    self.data = function (x) {
        if (!arguments.length) {
            return {
                id: id,
                title: title,
                authors: authors,
                resources: resources
            };
        }

        id = x.id;
        title = x.title;
        authors = x.authors;
        resources = x.resources;

        return self;
    };

    return self;
};