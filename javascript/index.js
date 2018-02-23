// VARS//
//config
var port = 4242;

//includes
var file = require("./file.js");
var express = require('express');
var parser = require('body-parser');
var path = require("path");
var minify = require('express-minify');

//env vars
var app = express();
app.use(minify());
app.use(express.static('public'));
app.use(parser.json());

var content = file.getContent("../json/1500-random-images.json");

//server launch
app.listen(port, function () {
    console.log('EPIPIC listening on ' + port);
});



//FUNCTIONS//
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../html/index.html'));
});

app.get('/api/pictures', function(req, res) {
    var from = req.query.cursor ? Number(req.query.cursor) : 0;
    var number = req.query.amount ? Number(req.query.amount) : 0;
    var tag = req.query.tag;
    var send = content;

    if (tag) {
        send = content.filter(function (element) {
            return element.tags.indexOf(tag) > -1;
        })
    }
    if (from >= 0 && number > 0) {
        if (from + number >= Number(content.length))
            number = Number(content.length) - from;
        res.send(send.slice(from, from + number));
    }
    else {
        res.send({"size":content.length});
    }
});


app.post('/api/pictures', function(req, res) {
    try {
        var previous_length = Number(content.length);
        if (previous_length < content.push(req.body)) {
            res.send(req.data);
        }
        else {
            res.send({"error":"cannot push json"});
        }
    } catch(e) {
        res.send({"error":"not a json"});
    }
});


app.delete('/api/pictures/:id', function(req, res) {
    var id = req.params.id;
    for (var i = 0; i < Number(content.length); i++) {
            if (content[i].id === id) {
                content.splice(i, 1);
                res.send(id);
                return;
            }
        }
    res.send({"error":"id not found"});
});
