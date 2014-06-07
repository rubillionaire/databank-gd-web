var events = require('events');
var Dispatcher = new events.EventEmitter();

var self = {};

self.dispatcher = Dispatcher;

self.dispatcher.on('test', function () { console.log('boosh'); });
self.dispatcher.on('test-args',
        function (args) { console.log(args.name); });

self.dispatcher.emit('test');
self.dispatcher.emit('test-args', {name:'first'});