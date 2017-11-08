/* global __dirname */

var schedule = require('node-schedule');
var express = require('express');
var app = express();
var path = require('path');
var bodyparser = require('body-parser');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var client_mongo = require ( 'mongodb' ).MongoClient;
//app.use(require('style').middleware(__dirname));
app.use(express.static(__dirname));
app.use(bodyparser.json());
var raml = require('raml2html');
//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var imports = require('./app.js');

//A2

app.listen(3000);
//exemples de Jacques Berger INF4375
app.get('/doc', function (req, res) {
    //pris des exemples de Jacques Berger INF4375
    var config = raml.getDefaultConfig(false);
    var onError = function (err) {
        console.log(err);
        res.sendStatus(500);
    };
        var onSuccess = function(html) {
        res.send(html);
    };
    raml.render("./route.raml", config).then(onSuccess, onError);
});