/* 
 * Copyright 2014 Jacques Berger.
// Inspire du travail d'Alexandar Dimitrov a l'ete 2014.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 */
var mongodb = require("mongodb");

var instanceDB;

module.exports.getConnection = function(callback) {
  if (instanceDB) {
    callback(null, instanceDB);
  } else {
    var server = new mongodb.Server("localhost", 27017, {auto_reconnect: true, keepAlive: 300000});
    var db = new mongodb.Db("MIRR16098007", server, {safe: true});

    if (!db.openCalled) {
      db.open(function(err, db) {
        if (err) {
          callback(err);
        }
        instanceDB = db;
        callback(err, instanceDB);
      });
    }
  }
};
