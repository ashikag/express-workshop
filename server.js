var fs = require('fs');
var express = require('express');
var formidable = require('express-formidable');
var app = express();

app.use(express.static("public"));

app.use(formidable());

app.post('/create-post', function (req, res) {
    console.log(req.fields);
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {

        var parsedFile = JSON.parse(file);
        
        // after this , we want to add in the new data from req.fields
        parsedFile[new Date().valueOf()] = req.fields.blogpost;
        // then we want to fs.writefile the data back to disk
        console.log(parsedFile)
        var string = JSON.stringify(parsedFile)
        fs.writeFile(__dirname + '/data/posts.json', string, function (error) {
            res.send("uploaded post")
        });
    });
});

app.listen(8080, function () {
  console.log("Server is listening on port 8080. Ready to accept requests!");
});

