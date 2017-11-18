/* global __dirname, data */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');


var db = require('./db/db');
var query = require('./db/query');
var routes = require('./routes/index');
var app = express();
app.use('/', routes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');


/*
 *	INF4375 
 *	Miri Ramin MIRR16098007
 */





// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


module.exports = app;

// catch 404 and forward to error handler
