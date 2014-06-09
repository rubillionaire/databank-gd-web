var level = require('level');
var http  = require('http');
var data  = require('./data.js');

var db = level(__dirname + '/../db', {
    valueEncoding: 'json'
});

var class_count = 0;
db.createReadStream({
    start : "class!",
    end   : "class!~",
    keys  : true,
    values: false
}).on('data', function (data) {
    class_count += 1;
}).on('end', function () {
    console.log('class count: ', class_count);
});

// var resource_count = 0;
// db.get('resource!0', function (err, data) {
//     resource_count += 1;
//     console.log('resource_count: ', resource_count);
// });
// db.get('resource!1', function (err, data) {
//     resource_count += 1;
//     console.log('resource_count: ', resource_count);
// });

db.createReadStream()
    .on('data', function (data) {
        if (data.value.type === 'class') {
            console.log(data);
        }
    })
    .on('end', function () {
        db.close();
    });