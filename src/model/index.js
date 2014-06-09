var ModelClass    = require('./class');
var ModelEducator = require('./educator');
var ModelMe       = require('./me');
var ModelResource = require('./resource');
var ModelTag      = require('./tag');

var ModelRelated  = require('./related');
var Datastore     = require('./datastore');

var Transform     = require('./transform');
var LastKey       = require('./last_key');


module.exports = function Model (context) {
    var self = {};
    self.transform = Transform;

    var model_context = {};
    model_context.datastore  = Datastore();
    model_context.dispatcher = context.Dispatcher;
    model_context.last_key   = factory(LastKey, model_context);

    // models
    self.class_   = factory(ModelClass, model_context);
    self.educator = factory(ModelEducator, model_context);
    self.resource = factory(ModelResource, model_context);
    self.tag      = factory(ModelTag, model_context);
    self.me       = ModelMe(model_context);

    // gathers related models
    self.related  = function () {
        return ModelRelated(model_context)
                    .models(self);
    };

    return self;
};

function factory (x, y) {
    return function () {
        return x(y);
    };
}