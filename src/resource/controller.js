var Model = require('./model');
var View  = require('./view');

module.exports = function ResourceController (context) {
    var self = {};

    self.render = function (d) {
        console.log('context.data');
        console.log(context.data);
        var data  = context.data.get('resource', d.id);
        var model = Model().data(data);
        var view  = View()
                        .container(context.body_sel)
                        .model(model)
                        .render();
    };
    
    return self;
};