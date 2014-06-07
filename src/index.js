var d3 = require('d3');
window.d3 = d3;

var body_sel   = d3.select('body');

var Hash       = require('./hash');
var Router     = require('./router');

var Model      = require('./model/index');

var Resource   = require('./ResourceViewController');
var Class      = require('./ClassViewController');
var Index      = require('./IndexViewController');
var Tag        = require('./TagViewController');
var Me         = require('./MeViewController');

var Events     = require('events');
var Dispatcher = function () { return new Events.EventEmitter(); };


databank();


function databank () {
    var context = {};

    context.body_sel   = body_sel;
    context.hash       = Hash();

    context.Dispatcher = Dispatcher;
    context.model      = Model(context);

    // view controllers
    context.resource   = Resource(context);
    context.class_     = Class(context);
    context.index      = Index(context);
    context.router     = Router(context);
    context.tag        = Tag(context);
    context.me         = Me(context);

    (function initialize () {
        context.router.initialize();
    })();
}