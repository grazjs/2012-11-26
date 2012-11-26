var test = require('tap').test;
var fs = require('fs');
var http = require('http');
var serveStatic = require('../serveStatic')(__dirname);

test("make sure it works", function(t){
    t.plan(2);

    var server = http.createServer(serveStatic);
    server.listen(5555);

    process.nextTick(function(){
        http.get('http://localhost:5555/test.js', function(res){
            t.equal(res.statusCode, 200);

            var content = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk){ content += chunk; });
            res.on('end', function() {
                var expected = fs.readFileSync(__filename, 'utf8');
                t.equal(content, expected);

                server.close();
            });
        });
    });
});