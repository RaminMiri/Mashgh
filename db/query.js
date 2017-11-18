var mongodb = require('mongodb');
var db = require('./db.js');
const csv = require('csvtojson');
var parseString = require('xml2js').parseString,
    request = require('request');


const url1 = "http://donnees.ville.montreal.qc.ca/dataset/4604afb7-a7c4-4626-a3ca-e136158133f2/resource/cbdca706-569e-4b4a-805d-9af73af03b14/download/piscines.csv";
const url2 = "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml";
const url3 = "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_GLISSADE.xml";


module.exports = {
    getArrondissement :  function (arrond, res) {
        var result = [];
        db.getConnection(function(err, db) {
            db.collection('patinoire', function (err, collection) {
                if (err) {
                    db.close();
                    console.log(err);
                } else {
             var cursor  = collection.find({"arrondissement.nom_arr": { $regex: '.*' + arrond + '.*', $options:'i' }});
            db.collection('glissade', function (err, collection) {
                if (err) {
                    db.close();
                    console.log(err);
                } else {
              cursor  =  collection.find({"arrondissement.nom_arr": { $regex: '.*' + arrond + '.*', $options:'i' }});
                                
            db.collection('picsines', function (err, collection) {
                if (err) {
                    db.close();
                    console.log(err);
                } else {
                 cursor  = collection.find({"ARRONDISSE": { $regex: '.*' + arrond + '.*', $options:'i' }});
                 cursor.toArray(function (err, inst){
                     
                 for (var i = 0; i < inst.length; i++) {
                    result.push(inst[i]);                    
              }    
                    res(null,result);
                 });
                }
            });
                                
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

        dropp : function (res) {
                db.getConnection(function(err, db) {
                    if (err) {
                        db.close();
                        console.log("inja")
                        res(err);
                    }
                    db.listCollections().toArray(function(err, collInfos) {
                       collInfos.forEach(function(collName) {
                            if (collName.name != null && collName.name != "default") {
                              console.log("Dropping ["+collName.name+"]");
                              db.collection(collName.name).drop();  
                             // res(null);
                            }else {
                                res(null);
                            }
                        });
                    });
                });
    },
    
    insertion : function (res) {
        
        var patinoires_json = "",
            piscines_json = [],
            glissades_json = "";
                csv().fromStream(request.get(url1)).on('json', (body) => {
                        //console.log("second");

                  piscines_json.push(body);
                    }).on('done', (err) => {
                        if (err){
                       body(err);
                        }
                        console.log("FIRST");
                        db.getConnection(function (err, db) {
        if (err) {
            console.log("Cannot connect to DB!");
            //db.close();
            res(err);
        }
        console.log("Connected");
        // Create the collection
                        db.createCollection('picsines', function (err, collection) {
            if (err) {
                console.log("Cannot create the collection!");
                throw err;
            }
            console.log("Collection created");
            collection.insert(piscines_json, {w: 1}, function (err, doc) {
                if (err) {
                    console.log(piscines_json);
                    res(err);
                }
                console.log("Les insertion est fait");
                
                request(url2, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                if (response.statusCode >= 200 && response.statusCode < 400) {

                    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                parseString(body, function (err, result) {
                     patinoires_json = result.patinoires.patinoire;
                     
                     if (err){ res(err);}
                     db.createCollection('patinoire', function (err, collection) {
            if (err) {
                console.log("Cannot create the collection!");
                throw err;
            }
            console.log("Collection created");
            collection.insert(patinoires_json, {w: 1}, function (err, doc) {
                if (err) {
                    console.log("Erreur d\'insertion dans la collection patinoires");
                    res(err);
                }
                console.log("Les insertion est fait");
                request(url3, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    if (response.statusCode >= 200 && response.statusCode < 400) {
        parseString(body, function (err, result) {
            glissades_json = result.glissades.glissade;
            if (err){res(err);}
            db.createCollection('glissade', function (err, collection) {
            if (err) {
                console.log("Cannot create the collection!");
                throw err;
            }
            console.log("Collection created");
            collection.insert(glissades_json, {w: 1}, function (err, doc) {
                if (err) {
                    console.log("Erreur d\'insertion dans la collection glissade!");
                    res(err);
                }
                    res(null);
            });
        });
        });
    }
});


            });
        });
                    });
    }
});

            });
        });
                        });
                    });
    },
    
    sauvegarder_fichier_json : function (data, fichier) {
    fs.writeFile(fichier, JSON.stringify(data, null, 4), function (err) {
        if (err) {
            throw 'Erreur en souvegardant dans le fichier' + fichier;
        } else {
            console.log('Sauvegardé dans le fichier ' + fichier);
        }
    });
}
    
}

