var express = require('express');
var app = express();
var config = require('./server/config');
app = config.initialize(app);

app.listen(process.env.PORT, function(){
    console.log("Server listening at port " + process.env.PORT);
});




