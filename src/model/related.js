module.exports = function Related (context) {
    var self = {};
    var data = {};

    // queue of tasks to watch for completion
    // each is removed from the queue when
    // its task is complete
    var queue = [];

    // models and arguments that will be
    // called in order to start processing
    // the queue
    // { func: , args: }
    var deferred = [];

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

    self.queue = {};
    self.queue.resource = function (resource_id, related) {
        var related_to_load = related ||
                              ['tags', 'classes', 'educators'];

        add_model_plus_related_query_to_queue({
            model_key   : 'resource',
            model_id    : resource_id,
            related_keys: related_to_load,
            model_map: {
                'resource' : models.resource,
                'tags'     : models.tag,
                'educators': models.educator,
                'classes'  : models.class_
            }
        });

        return self;
    };

    self.queue.class_ = function (class_id, related) {
        var related_to_load = related || ['resources'];

        add_model_plus_related_query_to_queue({
            model_key   : 'class_',
            model_id    : class_id,
            related_keys: related_to_load,
            model_map: {
                'class_'   : models.class_,
                'resources': models.resource
            }
        });

        return self;
    };


    self.queue.me = function (related) {
        // me references the local object
        
        var related_to_load = related ||
                              ['resources', 'classes'];
        

        // store me data into the data
        data.me = models.me.load();

        // provide a model map for the 
        // deferred model resolution,
        // it ensures data has models
        // in it, not just objects.
        var model_map = {
            'resource' : models.resource,
            'classes'  : models.class_
        };


        related_to_load.forEach(add_related_keys_to_queue);
        related_to_load.forEach(function (d, i) {
            var related_key = d;

            deferred.push({
                func: gather_related,
                args: [related_key,
                       models.me[related_key](),
                       model_map]
            });
        });

        return self;
    };

    // self.queue.class_ = function (class_id, related) {

    // };

    self.queue.start = function () {
        console.log('started queue: ', queue);
        console.log('processing deferred: ', deferred);
        deferred.forEach(function (d, i) {
            d.func.apply(undefined, d.args);
        });
    };

    function add_model_plus_related_query_to_queue (args) {
        // add a query that gets model data
        // and gets related models

        args.related_keys.forEach(add_related_keys_to_queue);

        var current_model = args.model_map[args.model_key]();

        current_model.data({ id: args.model_id });

        var queue_key = 'loaded--model-' + args.model_key;
        queue.push(queue_key);

        current_model.dispatcher
            .on('loaded', function () {
                data[args.model_key] = current_model;

                args.related_keys.forEach(function (d, i) {
                    var related_key = d;
                    gather_related(
                        related_key,
                        current_model[related_key](),
                        args.model_map);
                });

                var i = queue.indexOf(queue_key);
                queue.splice(i, 1);
                if (!queue.length) {
                    self.dispatcher.emit('loaded');
                }
            });

        deferred.push({
            func: current_model.load,
            args: []
        });
    }

    function add_related_keys_to_queue (d, i) {
        // d => a related key to queue

        var related_key = d;
        
        // add this key to the queue
        queue.push(related_key);

        // give this key some space in
        // the data object
        data[related_key] = {};

        // deal with the related models
        // events that are dispatched
        self.dispatcher
            .on('loaded--related-' + related_key,
                function () {

                    // check queue
                    var i = queue.indexOf(related_key);
                    queue.splice(i, 1);
                    if (!queue.length) {
                        self.dispatcher.emit('loaded');
                    }
                });
    }

    function gather_related (type, id_array, model_map) {
        // gathers and stashes models loaded
        // with their data, in this self.data();
        // related data is stashed in an object,
        // keyed by id, since thats what the 
        // view references in the model.
        var to_gather = id_array.length;
        var gathered = 0;

        if (to_gather === gathered) {
            self.dispatcher
                .emit('loaded--related-' + type);
        }

        id_array.forEach(function (id) {
            var type_model = model_map[type]();

            type_model.dispatcher
                .on('loaded', function () {
                    // now that the type_model has
                    // its data loaded, stash
                    // a reference to it on the 
                    // data object
                    data[type][id] = type_model;

                    gathered += 1;

                    if (to_gather === gathered) {
                        self.dispatcher
                            .emit('loaded--related-' + type);
                    }
                });

            type_model.data({ id: id }).load();
        });
    }

    return self;
};