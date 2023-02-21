var express = require('express');

const serverRouter = require("./Router/serverRouter");
const appRouter = require("./Router/appRouter");


var app = express();

app.use("/server", serverRouter);
app.use("/app", appRouter);
app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.listen(5500, function () {
    console.log('Example app listening on port 5500!');
});