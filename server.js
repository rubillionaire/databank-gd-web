var level      = require('level');
var http       = require('http');
var browserify = require('browserify');
var Engine     = require('engine.io-stream');
var multilevel = require('multilevel');
var liveStream = require('level-live-stream');

var http    = require('http');
var express = require('express');
var port    = 8000;
var app     = express();

app.use(express.static(__dirname + '/static'));

var server = http.createServer(app);

server.listen(port);

// db
var db = level(__dirname + '/db', {
    valueEncoding: 'json'
});

liveStream.install(db);
multilevel.writeManifest(db, __dirname + '/manifest.json');

// websockets
var engine = Engine(function (con) {
    con.pipe(multilevel.server(db)).pipe(con);
});

engine.attach(server, '/engine');

console.log('visit http://localhost:' + port);