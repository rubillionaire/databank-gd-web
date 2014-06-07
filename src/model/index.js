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
    self.class_   = functor(ModelClass, model_context);
    self.educator = functor(ModelEducator, model_context);
    self.me       = functor(ModelMe, model_context);
    self.resource = functor(ModelResource, model_context);
    self.tag      = functor(ModelTag, model_context);

    // gathers related models
    self.related  = ModelRelated(model_context)
                        .models(self);

    return self;
};

function functor (x, y) {
    return function () {
        return new x(y);
    };
}