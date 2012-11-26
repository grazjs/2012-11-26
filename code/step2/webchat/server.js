var http = require('http');
var path = require('path');
var serveStatic = require('./serveStatic');

var eventSourceHandler = require('./eventSource')();
var wwwRoot = path.resolve(__dirname, 'wwwRoot/');
var staticHandler = serveStatic(wwwRoot);

http.createServer(function(req, res) {

    switch (req.url) {
        case '/eventsource':
            return eventSourceHandler.handle(req, res);

        case '/msg':
            var data = '';
            req.setEncoding('utf8');
            req.on('data', function(chunk) { data += chunk; });
            req.on('end', function() {
                eventSourceHandler.send(new Date().toJSON() + ' ' + data);

                res.writeHead(200, { 'content-type':'text/plain' });
                res.end('ok');
            });
            break;

        default:
            staticHandler(req, res);
            break;
    }

}).listen(1337);