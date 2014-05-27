var Model = require('./model');
var View  = require('./view');

module.exports = function ResourceController (context) {
    var self = {};

    self.render = function (d) {
        var data  = context.data.get('resource', d.id);
        var model = Model().data(data);
        var view  = View()
                        .container(context.body_sel)
                        .model(model);

        if (d.version) {
            view.version(d.version);
        }

        view.dispatch
            .on('changeViewToTag.controller', function () {

            })
            .on('addToClass.controller', function (d) {

            })
            .on('changeViewToClass.controller', function (d) {

            })
            .on('setVersion.controller', function () {
                var version_number = view.version();
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


    
    return self;
};