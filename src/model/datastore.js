var Engine = require('engine.io-stream');
var multilevel = require('multilevel');
var manifest = require('./manifest.json');

var db = multilevel.client(manifest);
var con = Engine('/engine');
con.pipe(db.createRpcStream()).pipe(con);

window.db = db;

module.exports = function () {

    var me = {
      id: 'me',
      classes: [],
      resources: []
    };

    if (!localStorage.getItem('me!me')) {
        localStorage.setItem('me!me', JSON.stringify(me));
    }

    db.local = {};
    
    db.local.set = function (namespace, id, d) {
        var update_metadata = false;
        var item_id = namespace;
        if (arguments.length === 3) {
            item_id += ('!' + id);
        }
        console.log('setting: ' + item_id);
        localStorage.setItem(item_id,
                             JSON.stringify(d));
    };

    db.local.get = function (namespace, id) {
        var item_id = namespace;
        if (arguments.length === 2) {
            item_id += ('!' + id);
        }

        return JSON.parse(
            localStorage.getItem(item_id));
    };

    return db;
};