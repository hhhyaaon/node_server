var fs = require("fs");
var path = require("path");


function readFile(filename, cb) {
    fs.readFile(
        filename,
        { encoding: "utf-8", flag: "r" },
        function (err, data) {
            if (typeof cb === "function") {
                cb.apply(this, Array.prototype.slice.call(arguments));
            }
        }
    );
}

function writeFile() {

}

module.exports = {
    readFile: readFile,
    writeFile: writeFile
}