var mongodb = require('mongodb');
var db = require('./db.js');

module.exports = {
    getArrondissement :  function (arrond, res) {
        db.getConnection(function(err, db) {
            db.collection('patinoire', function (err, collection) {
                if (err) {
                    console.log(err);
                } else {
                    collection.find({$text: { $search: arrond }}).toArray(
                        function (err, arrondissement) {
                        if (err) {
                            console.log(err);
                 
                        } else {
                            arrondissement.json(arrondissement);
                            console.log(arrondissement);
                            db.close();
                        }
                    });
                }
            });
        });
    }
    
}

