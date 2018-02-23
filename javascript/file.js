//file.js
//to output the content of a file

var fs = require('fs');

function readJsonFileSync(filepath, encoding) {

    if (typeof (encoding) === 'undefined') {
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

module.exports = {
    getContent: function (file) {
        var filepath = __dirname + '/' + file;
        return readJsonFileSync(filepath);
    }
};