var ModelClass    = require('./class');
var ModelEducator = require('./educator');
var ModelMe       = require('./me');
var ModelResource = require('./resource');
var ModelTag      = require('./tag');

var Datastore  = require('./datastore');


module.exports = function Model (context) {
    var self = {};

    var model_context = {};
    model_context.datastore  = Datastore();
    model_context.dispatcher = context.Dispatcher;

    self.class_   = ModelClass(model_context);
    self.educator = ModelEducator(model_context);
    self.me       = ModelMe(model_context);
    self.resource = ModelResource(model_context);
    self.tag      = ModelTag(model_context);

    return self;
};