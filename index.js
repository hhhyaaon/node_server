var server = require("./server");
var router = require("./router/router");

server.create(router.router);