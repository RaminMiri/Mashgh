/* global __dirname */

var schedule = require('node-schedule');
var express = require('express');
var app = express();
var path = require('path');
var bodyparser = require('body-parser');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(require('style').middleware(__dirname));
app.use(express.static(__dirname));
app.use(bodyparser.json());
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


app.listen(3000);

//A2
var rule = new schedule.RecurrenceRule();
rule.hour = '*';
rule.minute = '*';
imports.inserer_collections_dans_bd();
//schedule.scheduleJob(rule, function() {
//    imports.inserer_collections_dans_bd(function (err) {
//        if(err) {
//            console.log(err);
//        } else {
//            console.log("Import completed!");
//        }
//    });
//});
