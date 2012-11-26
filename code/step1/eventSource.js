module.exports = function() {

    var connections = [];

    return {
        handle: function(req, res) {
            res.writeHead(200, {'content-type': 'text/event-stream'});
            req.connection.on('close', function() {
                var index = connections.indexOf(res);
                connections.slice(index, 1);
            });

            connections.push(res);
        },
        send: function(message) {
            connections.forEach(function(res) {
                res.write('data: ' + message + '\n\n');
            });
        }

    };

};