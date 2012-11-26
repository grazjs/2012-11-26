#!/usr/bin/env node

var serveStatic = require('./serveStatic');
var http = require('http');


var currentDirectory = process.cwd();
var serve = serveStatic(currentDirectory);

http.createServer(serve).listen(8888, '127.0.0.1');
console.log('serving at http://localhost:8888');