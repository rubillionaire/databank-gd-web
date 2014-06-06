var ModelClass    = require('./class');
var ModelEducator = require('./educator');
var ModelMe       = require('./me');
var ModelResource = require('./resource');
var ModelTag      = require('./tag');

var Datastore  = require('./datastore');
var Dispatcher = require('events').EventEmitter;


module.exports = function Model () {
    var self = {};

    var context = {};
    context.datastore  = Datastore();
    context.dispatcher = Dispatcher;

    self.class_   = ModelClass(context);
    self.educator = ModelEducator(context);
    self.me       = ModelMe(context);
    self.resource = ModelResource(context);
    self.tag      = ModelTag(context);

    return self;
};