

var express = require('express');
var app = express();
var config = require('./server/config');
app = config(app);

app.listen(3000, function(){
    console.log("Server listening at port 3000");
});




