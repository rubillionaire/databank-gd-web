var Engine = require('engine.io-stream');
var multilevel = require('multilevel');
var manifest = require('./manifest.json');
var List = require('level-list');

var db = multilevel.client(manifest);
var con = Engine('/engine');
con.pipe(db.createRpcStream()).pipe(con);

console.log('hey!');

window.db = db;

// var list = List(db, function (row) {
//     var p = document.createElement('p');
//     p.appendChild(document.createTextNode(row.text));
//     return p;
// });

// container.appendChild(list.el);

db.createLiveStream().on('data', function (change) {
    console.log(change);
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(change.value.text));
});