
var path = require("path");

var view = path.join(__dirname, "../view");
var controller = path.join(__dirname, "../controller");

var routeMap = {
    "/": {
        action: require(path.join(controller, "./index.js")).Index
    },
    "/upload": {
        action: require(path.join(controller, "./upload.js")).Upload
    }
}

var router = function (pathname, req, resp) {
    var map = routeMap[pathname];
    if (!!map) {
        var viewFn = map.action;
        if (typeof viewFn === "function") {
            viewFn(function (content) {
                resp.writeHead(200, { "Content-Type": "text/html" });
                resp.write(content);
                resp.end();
            });
        }
    } else {
        resp.writeHead(404, { "Content-Type": "text/html" });
        resp.write("404 Not Found");
        resp.end();
    }
};


module.exports = {
    routeMap: routeMap,
    router: router
};