var mongodb = require('mongodb');
var db = require('./db.js');

module.exports = {
    getArrondissement :  function (arrond, res) {
        db.getConnection(function(err, db) {
            db.collection('patinoire', function (err, collection) {
                if (err) {
                    console.log(err);
                } else {
                    collection.find({$text: { $search : arrond }}).toArray(
                        function (err, arrondissement) {
                        if (err) {
                            
                            console.log(err);
                 
                        } else {
                            arrondissement.json(arrondissement);
                            console.log(arrondissement);
                        }
                    });
                }
            });
        });
    },
    inserer_collection : function  (  nom_collection, json_object ) {
	db.createCollection ( nom_collection, function ( err, collection ) {
		if ( err ) {
                    console.log(err);
			throw 'Erreur dans la creation de la collecction ' + nom_collection;
		}

		collection.insert( json_object, { w:1 }, function ( err, result ) {
			if ( err ) {
                            console.log(err);
				throw 'Erreur d\'insertion dans la collection ' + nom_collection;
			} else {
				console.log ( 'Insertion avec succes dans la collection ' + nom_collection );
			}
		});
	});
    },

        dropp : function () {
                db.getConnection(function(err, db) {
                    if (err) {
                        db.close();
                        console.log(err);
                    }
                    db.listCollections().toArray(function(err, collInfos) {
                       collInfos.forEach(function(collName) {
                            if (collName.name != null) {
                              console.log("Dropping ["+collName.name+"]");
                              db.collection(collName.name).drop();
                              
                            }
                            db.close();
                        });
                    });
                });
    }
    
}

