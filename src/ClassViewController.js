var ClassViewResourceList = require('./view/class_resource_list');
var ClassAdd = require('./ClassAddController');

module.exports = function ClassViewController (context) {
    var self = {};
    var class_view_resource_list;
    var class_model;
    var resource_models;

    self.actions = {};

    self.actions.add = ClassAdd(context);

    self.render = function (hash) {
        console.log('ClassAddController.render - '+
                    'overview of classes.');

        class_view_resource_list = ClassViewResourceList()
            .container(context.body_sel);

        var view_data_gatherer = context.model.related();

        view_data_gatherer
            .dispatcher
            .on('loaded', function () {
                var view_data = view_data_gatherer.data();

                console.log('view data loaded');
                window.view_data = view_data;

                // pull models for view
                class_model = view_data.class_;

                resource_models =
                    context.model
                        .transform
                        .object_to_array(view_data.resources);

                // setup and render the view
                class_view_resource_list
                    .classModel(class_model)
                    .resourceModels(resource_models)
                    .render();

            });

        console.log('hash.class_id');
        console.log(hash.class_id);
        view_data_gatherer
            .queue
                .class_(hash.class_id, ['resources'])
            .queue
                .start();

        return self;
    };

    return self;
};