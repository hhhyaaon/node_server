var f = require("../util/file");
var path = require("path");

var root = path.join(__dirname, "../view");

function Index(cb) {
    var view = "empty";
    f.readFile(path.join(root, "./index.html"), (err, data) => {
        if (typeof cb === "function") {
            view = data;
            cb.call(this, view);
        }
    });
}

module.exports = {
    Index: Index
}