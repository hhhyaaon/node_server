var f = require("../util/file");
var path = require("path");

var root = path.join(__dirname, "../view");

function Upload(cb) {
    var view = "empty";
    f.readFile(path.join(root, "./upload.html"), (err, data) => {
        if (typeof cb === "function") {
            view = data;
            cb.call(this, view);
        }
    });
}

function UploadFile() {

}

function Submit() {

}



module.exports = {
    Upload: Upload,
    UploadFile: UploadFile,
    Submit: Submit
}