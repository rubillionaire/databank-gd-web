var level = require('level');
var http  = require('http');
var data  = require('./data.js');

var db = level(__dirname + '/../db', {
    valueEncoding: 'json'
});

var operations = data.map(function (d, i) {
    d.type = 'put';
    return d;
});

db.batch(operations, function (err) {
    if (err) throw "Error batch bootstrapping";
    db.createReadStream()
        .on('data', console.log)
        .on('close', function () {
            db.close();
        });
});