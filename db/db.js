/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongodb = require("mongodb");

var instanceMongoDB;

module.exports.getConnection = function(callback) {
  if (instanceMongoDB) {
    callback(null, instanceMongoDB);
  } else {
    var server = new mongodb.Server("localhost", 27017, {auto_reconnect: true});
    var db = new mongodb.Db("inf4375", server, {safe: true});

    if (!db.openCalled) {
      db.open(function(err, db) {
        if (err) {
          callback(err);
        }
        instanceMongoDB = db;
        callback(err, instanceMongoDB);
      });
    }
  }
};
