var http = require("http");
var url = require("url");

function create(route) {
    var server = http.createServer((req, resp) => {
        _onRequest.call(this, req, resp, route);
    });
    server.listen(81);
    console.log("listen at localhost:81");
    return server;
}

function _onRequest(req, resp, route) {
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);


    route(pathname, req, resp);
   


}




module.exports = {
    create: create
}