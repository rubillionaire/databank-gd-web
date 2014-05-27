var ResourceModel = require('./model/resource');
var ResourceView  = require('./view/resource');

module.exports = function ResourceController (context) {
    var self = {};
    var data;
    var model;
    var view;

    self.render = function (d) {
        data  = context.datastore.get('resource', d.id);
        model = ResourceModel().data(data);
        view  = ResourceView()
                    .container(context.body_sel)
                    .model(model);

        if (d.version) {
            view.version(d.version);
        }
        if (d.edit) {
            view.edit(d.edit);
        }

        view.dispatch
            .on('changeViewToTag.controller', function () {

            })
            .on('addToClass.controller', function (d) {

            })
            .on('changeViewToClass.controller', function (d) {

            })
            .on('setVersion.controller', function () {
                stash_and_rerender_state();
                console.log('cancelEditable');
            })
            .on('setEditable.controller', function () {
                stash_and_rerender_state();
                console.log('cancelEditable');
            })
            .on('cancelEditable.controller', function () {
                stash_and_rerender_state();
                console.log('cancelEditable');
            })
            .on('saveEditable.controller', function (d) {
                console.log('save editable.');
                model.versions.add(d);
                context.datastore.set('resource',
                                      model.id(),
                                      model.data());

                var version_number = model.versions.count();
                var version = model.versions.get(version_number);

                context.hash.is({
                    view: 'resource',
                    id: model.id(),
                    title: version.title,
                    version: version_number,
                    edit: view.edit()
                });
            });

        view.render();
    };

    function stash_and_rerender_state () {
        var version_number = view.version();
        var version = model.versions.get(version_number);
        context.hash.is({
            view: 'resource',
            id: model.id(),
            title: version.title,
            version: version_number,
            edit: view.edit()
        });
    }
    
    return self;
};