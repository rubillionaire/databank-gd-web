var ResourceModel = require('./model/resource');
var ClassModel = require('./model/class');
var ClassViewResourceList = require('./view/class_resource_list');
var ClassAdd = require('./ClassAddController');

module.exports = function ClassController (context) {
    var self = {};

    self.actions = {};

    self.actions.add = ClassAdd(context);

    self.render = function (hash) {
        console.log('ClassAddController.render - '+
                    'overview of classes.');
        var class_data =
            context.datastore.get('classes', hash.class_id);

        var resource_models = [];
        var class_model = ClassModel().data(class_data);

        class_model.resources().forEach(function (d, i) {
            var resource_data = context.datastore
                                       .get('resources', d);
            var resource_model = ResourceModel()
                                    .data(resource_data);
            resource_models.push(resource_model);
        });

        class_view_resource_list = ClassViewResourceList()
            .container(context.body_sel)
            .classModel(class_model)
            .resourceModels(resource_models);

        class_view_resource_list.render();

        return self;
    };

    return self;
};