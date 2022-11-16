var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');



var app = express();


// DB MongoDB
const db = require("./db/models");
db.mongoose
    .connect(db.url, {
        authSource:"admin",
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

console.log('-----------------------------------------------------');
console.log(db.url);
console.log('-----------------------------------------------------');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*" ); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);


module.exports = app;
