var ClassViewCreate  = require('./view/class_create');
var ClassViewList    = require('./view/class_selectable_list');

module.exports = function ClassAddController (context) {
    var self = {};
    var resource_data;
    var resource_model;
    var class_models;
    var view;

    self.render = function (d) {
        console.log('ClassAddController.render');
        console.log(d);

        // views
        class_list_view = ClassViewList();
        class_create = ClassViewCreate();

        var view_data_gatherer = context.model.related();

        // dispatchers
        class_list_view.dispatch
            .on('classSelected', function (d) {
                // d => ClassModel
                console.log('class selected', d.title());

                d.resources.add(resource_model.id());

                d.dispatcher.on('saved', function () {
                    context.hash.is({
                        controller: 'class',
                        action: 'view',
                        class_id: d.id(),
                        class_title: d.title()
                    });
                });

                d.save();
            });

        class_create.dispatch
            .on('classCreated', function (d) {
                // d => new class title


                // PICKUP
                // how do we get the total count
                // of an item in the datastore?
                // or increment based on the range
                // of existing items?
                // perhaps the metadata object is
                // still the way to go.
                // if so, hook it up here.

                var class_data = {
                    title: d,
                };

                // not currently listening
                // for save. oops?
                var new_class =
                        context
                            .model
                            .class_()
                            .data(class_data);

                new_class.dispatcher
                    .on('saved', function () {
                        context.model
                            .me
                            .classes
                            .add(new_class.id())
                            .save();
                    });

                new_class.save();

                console.log('new_class');
                console.log(new_class);

                class_list_view
                    .add_class(new_class)
                    .update();
            });

        // layout
        context.body_sel.html('');
        class_list_view
            .container(
                context
                    .body_sel
                    .append('div')
                        .attr('class', 'class-list-container'));
        class_create
            .container(
                context
                    .body_sel
                    .append('div')
                        .attr('class', 'class-add-container'));

        view_data_gatherer
            .dispatcher
            .on('loaded', function () {
                var view_data = view_data_gatherer.data();

                class_models =
                    context.model
                        .transform
                        .object_to_array(view_data.classes);

                resource_model = view_data.resource;

                window.view_data = view_data;
                console.log('loaded view data');
                console.log(class_models);

                class_list_view
                    .classes(class_models)
                    .render();

                class_create.render();
            });

        // then what does view_data look like when
        // its got everything it needs
        view_data_gatherer
            .queue
                .me(['classes'])
            .queue
                .resource(d.resource_id, [])
            .queue
                .start();
        
    };

    return self;
};