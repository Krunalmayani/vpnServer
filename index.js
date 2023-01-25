var express = require('express');

const serverRouter = require("./Router/serverRouter");


var app = express();

app.use("/server", serverRouter);
app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});