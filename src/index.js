var Hash     = require('./hash');
var Router   = require('./router');
var Data     = require('./fake_data');
var Resource = require('./ResourceViewController');

var body_sel = d3.select('body');


database();


function database () {
    var context      = {};

    context.body_sel  = body_sel;
    context.hash      = Hash();
    context.datastore = Data();
    context.resource  = Resource(context);
    context.router    = Router(context);

    (function initialize () {
        context.router.initialize();
    })();
}