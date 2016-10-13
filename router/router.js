
var path = require("path");
var url = require("url");
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
    },
    "/api/getInfoById": {
        method: "get",
        action: require(path.join(controller, "./upload.js")).GetInfoById
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
            _handleView(req, resp, viewFn);

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
                //get请求
                _handleGet(req, resp, apiFn);
            } else if (req.method === "POST") {
                //post 请求
                //var query = querystring.parse(postData);
                _handlePost(req, resp, apiFn);
            } else {

            }

        }
    } else {
        //未找到
        resp.writeHead(404, { "Content-Type": "text/html" });
        resp.write("404 Not Found");
        resp.end();
    }
};


function _handleView(req, resp, handle) {
    var query = querystring.parse(url.parse(req.url).query);
    var formArgs = _getFnArgs(handle);
    var actArgs = formArgs.slice(0, formArgs.length - 1).map(function (name) {
        return query[name];
    });
    handle.apply(this, actArgs.concat(function (content) {
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write(content);
        resp.end();
    }));
}


function _handleGet(req, resp, handle) {
    var query = querystring.parse(url.parse(req.url).query);
    var actArgs = _getFnArgs(handle).map(function (name) {
        return query[name];
    });
    var json = handle.apply(this, actArgs);


    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.write(JSON.stringify(json));
    resp.end();
}

function _handlePost(req, resp, handle) {
    var postData = "";
    req.setEncoding("utf-8");
    req.addListener("data", function (chunk) {
        postData += chunk;
    });
    req.addListener("end", function () {
        var query = querystring.parse(postData);
        var json = handle.call(this, query);

        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.write(JSON.stringify(json));
        resp.end();
    });
}

function _getFnArgs(fn) {
    if (typeof fn != "function") {
        console.error(fn + "is not a function");
        return;
    }
    var argArr = [];
    fn.toString().replace(/function\s+\w+\s*\((.*)\)/, function (word, $1) {
        argArr = $1.split(",").map(function (name) {
            return name.trim();
        })
    });
    return argArr;
}

module.exports = {
    routeMap: routeMap,
    router: router
};