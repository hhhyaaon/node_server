var f = require("../util/file");
var path = require("path");

var root = path.join(__dirname, "../view");

function Upload(id, cb) {
    f.readFile(path.join(root, "./upload.html"), (err, data) => {
        if (typeof cb === "function") {
            cb.call(this, data);
        }
    });

}

function UploadFile() {

}

function Submit(form) {
    return {
        code: 10000,
        data: true,
        msg: "success"
    }
}

function GetInfoById(id) {
    //获取底层
    return {
        code: 10000,
        data: {
            name: "刘狗狗",
            age: 100000
        },
        msg: "success"
    }
}



module.exports = {
    Upload: Upload,
    UploadFile: UploadFile,
    Submit: Submit,
    GetInfoById: GetInfoById
}