module.exports = function Related (context) {
    var self = {};
    var data = {};
    var singular_to_plural = {
        'tag': 'tags',
        'class_': 'classes',
        'educator': 'educators',
        'resource': 'resources'
    };
    var plural_to_singular = {
        'tags': 'tag',
        'classes': 'class_',
        'educators': 'educator',
        'resources': 'resource'
    };

    var models;

    self.dispatcher = context.dispatcher();

    self.models = function (x) {
        if (!arguments.length) return models;
        models = x;
        return self;
    };

    self.data = function () {
        return data;
    };

    self.gather = {};
    self.gather.resource = function (resource_id, to_load) {
        var related_to_load =
                to_load ||
                ['tags', 'classes', 'educators'];

        related_to_load.forEach(function (d, i) {
            // make an empty array for the
            // related models that will be loaded
            data[d] = {};

            // once a related model is gathered
            // check to see if all the related
            // models have been gathered.
            // emit `loaded` when its happened
            self.dispatcher
                .on('loaded--related-' +
                    plural_to_singular[d], function () {

                    var i = related_to_load.indexOf(d);
                    related_to_load.splice(i, 1);
                    if (!related_to_load.length) {
                        self.dispatcher.emit('loaded');
                    }
                });
        });

        var resource = models.resource();

        // get the initial object
        resource.dispatcher
                .on('loaded', function () {
                    data.resource = resource;
                    self.dispatcher.emit('loaded--resource');

                    gather_related('tag',
                                   resource.tags());
                    gather_related('class_',
                                   resource.classes());
                    gather_related('educator',
                                   resource.educators());
                });
        
        resource.data({ id: resource_id });

        return self;
    };

    function gather_related (type, id_array) {
        // gathers and stashes models loaded
        // with their data, in this self.data();
        // related data is stashed in an object,
        // keyed by id, since thats what the 
        // view references in the model.
        var to_gather = id_array.length;
        var gathered = 0;

        if (to_gather === gathered) {
            console.log(type, ' has none');
            self.dispatcher
                .emit('loaded--related-' + type);
        }

        id_array.forEach(function (id) {
            var type_model = models[type]();

            type_model.dispatcher
                .on('loaded', function () {
                    // now that the type_model has
                    // its data loaded, stash
                    // a reference to it on the 
                    // data object
                    data[singular_to_plural[type]]
                        [id] = type_model;

                    gathered += 1;

                    if (to_gather === gathered) {
                        self.dispatcher
                            .emit('loaded--related-' + type);
                    }
                });

            type_model.data({ id: id });
        });
    }

    return self;
};