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
var rule = new schedule.RecurrenceRule();
rule.hour = '*';
rule.minute = '*';
//client_mongo.connect("mongodb://localhost:27017/MIRR16098007", function(err, db) {
//     var dbName = 'MIRR16098007';
//            db.getSiblingDB(dbName).getCollectionNames().forEach(function(collName) {
//                    if (!collName.startsWith("system.")) {
//                        console.log("Dropping ["+dbName+"."+collName+"]");
//                        db[collName].drop();
//                        
//    }
//});
//});
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
app.listen(3000);