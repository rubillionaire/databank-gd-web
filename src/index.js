var Hash     = require('./hash');
var Router   = require('./router');
var Data     = require('./fake_data');
var Resource = require('./ResourceViewController');
var Class    = require('./ClassViewController');
var Index    = require('./IndexViewController');
var Tag      = require('./TagViewController');
var Me       = require('./MeViewController');

var body_sel = d3.select('body');


database();


function database () {
    var context      = {};

    context.body_sel  = body_sel;
    context.hash      = Hash();
    context.datastore = Data();

    // view controllers
    context.resource  = Resource(context);
    context.class_    = Class(context);
    context.index     = Index(context);
    context.router    = Router(context);
    context.tag       = Tag(context);
    context.me        = Me(context);

    (function initialize () {
        context.router.initialize();
    })();
}