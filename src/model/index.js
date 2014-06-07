var ModelClass    = require('./class');
var ModelEducator = require('./educator');
var ModelMe       = require('./me');
var ModelResource = require('./resource');
var ModelTag      = require('./tag');

var ModelRelated  = require('./related');
var Datastore  = require('./datastore');


module.exports = function Model (context) {
    var self = {};

    var model_context = {};
    model_context.datastore  = Datastore();
    model_context.dispatcher = context.Dispatcher;

    // models
    self.class_   = factory(ModelClass, model_context);
    self.educator = factory(ModelEducator, model_context);
    self.me       = factory(ModelMe, model_context);
    self.resource = factory(ModelResource, model_context);
    self.tag      = factory(ModelTag, model_context);

    // gathers related models
    self.related  = ModelRelated(model_context)
                        .models(self);

    return self;
};

function factory (x, y) {
    return function () {
        return x(y);
    };
}