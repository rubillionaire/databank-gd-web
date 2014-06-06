var level = require('level');
var http  = require('http');
var browserify = require('browserify');
var Engine = require('engine.io-stream');
var multilevel = require('multilevel');
var liveStream = require('level-live-stream');

// server
var server = http.createServer(function (req, res) {
    if (req.url === '/bundle.js') {
        browserify(__dirname + '/browser.js')
            .bundle({ debug: true })
            .pipe(res);
    } else {
        res.end('<script src="/bundle.js"></script>');
    }
});

server.listen(8000);

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

console.log('visit http://localhost:8000');