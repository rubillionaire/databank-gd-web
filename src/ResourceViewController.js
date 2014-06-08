var ResourceView  = require('./view/resource');

module.exports = function ResourceController (context) {
    var self = {};
    var resource_data;
    var resource_model;
    var tag_models;
    var educator_models;
    var view;

    self.render = function (d) {
        view = ResourceView()
                .container(context.body_sel);

        view.dispatch
            .on('changeViewToTag.controller', function (d) {
                context.hash.is({
                    controller: 'tag',
                    action: 'view',
                    tag_id: d.id,
                    tag_name: d.name
                });
            })
            .on('addToClass.controller', function () {
                var version_number = view.version();
                var version = resource_model
                                    .versions
                                    .get(version_number);
                context.hash.is({
                    controller: 'class',
                    action: 'add',
                    type: 'resource',
                    resource_id: resource_model.id(),
                    resource_title: version.title
                });

            })
            .on('changeViewToClass.controller', function (d) {
                console.log('changeViewToClass');
                console.log(d);
            })
            .on('changeViewToEducator.controller', function (d) {
                console.log('changeViewToEducator');
                console.log(d);
            });

        // setup the mechanism to render
        // once the data is loaded
        context.model
               .related
               .dispatcher
               .on('loaded', function () {
                    var view_data = context.model
                                        .related
                                        .data();

                    resource_model = view_data.resource;
                    tag_models = view_data.tags;
                    educator_models = view_data.educator_models;

                    view.resourceModel(view_data.resource)
                        .tags(view_data.tags)
                        .educators(view_data.educators)
                        .render();
               });

        // kicks off data gathering
        // emits `loaded` when complete
        context.model
               .related
               .gather
               .resource(d.id, ['tags', 'classes', 'educators']);
    };

    function stash_and_rerender_state () {
        var version_number = view.version();
        var version = resource_model
                        .versions
                        .get(version_number);
        context.hash.is({
            controller: 'resource',
            action: view.edit() ? 'edit' : 'view',
            id: resource_model.id(),
            title: version.title,
            version: version_number
        });
    }
    
    return self;
};