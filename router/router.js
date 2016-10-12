
var path = require("path");
var querystring = require("querystring");

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

var apiMap = {
    "/api/submit": {
        method: "post",
        action: require(path.join(controller, "./upload.js")).Submit
    }
}

var router = function (pathname, req, resp) {
    var route = routeMap[pathname];
    var api = apiMap[pathname];

    if (!!route) {
        // 路由接口
        if (req.method != "GET") {
            console.error("route should request through get method");
            return;
        }
        var viewFn = route.action;
        if (typeof viewFn === "function") {
            viewFn(function (content) {
                resp.writeHead(200, { "Content-Type": "text/html" });
                resp.write(content);
                resp.end();
            });
        }
    } else if (!!api) {
        //数据接口
        if (req.method.toLowerCase() != api.method.toLowerCase()) {
            console.error("should request through " + api.method + " method");
            return;
        }
        var apiFn = api.action;
        if (typeof apiFn === "function") {
            if (req.method === "GET") {
                console.log(req);
                //var query = querystring.parse(postData);
                apiFn();
            } else if (req.method === "POST") {
                console.log(req);
                //var query = querystring.parse(postData);
                apiFn();
            } else {

            }

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