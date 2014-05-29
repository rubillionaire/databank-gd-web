var ResourceModel = require('./model/resource');
var ClassModel    = require('./model/class');
var ClassViewAdd  = require('./view/class');

module.exports = function ClassAddController (context) {
    var self = {};
    var resource_data;
    var resource_model;
    var class_model;
    var view;

    self.render = function (d) {
        console.log('ClassAddController.render');
        console.log(d);

        // if logged out dispatch to log in
        // with trace of getting back to this state


        resource_data  = context.datastore
                                .get('resources', d.resource_id);

        resource_model = ResourceModel()
                            .data(resource_data);

        /// if logged in, look for classes that the user
        /// has, in ordre to populate a view that allows
        /// them to select or create a class
        // class_data  = context.datastore.get('class', )
        // class_model = ClassModel().data();
        
    };

    return self;
};