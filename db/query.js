//source
//https://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects

var mongodb = require('mongodb');
var db = require('./db.js');
const csv = require('csvtojson');
var parseString = require('xml2js').parseString,
    request = require('request'),
    ObjectId = require('mongodb').ObjectID,
    getErr = require('../err/err');

const url1 = "http://donnees.ville.montreal.qc.ca/dataset/4604afb7-a7c4-4626-a3ca-e136158133f2/resource/cbdca706-569e-4b4a-805d-9af73af03b14/download/piscines.csv";
const url2 = "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml";
const url3 = "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_GLISSADE.xml";

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
} 
module.exports = {
    
    getArrondissement :  function (arrond, res) {
        var result = [];
        db.getConnection(function(err, db) {
            db.collection('patinoire', function (err, collection) {
                if (err) {
                    db.close();
                    console.log(err);
                } else {
             var cursor  = collection.find({"ARRONDISSE": { $regex: '.*' + arrond + '.*', $options:'i' }});
             cursor.toArray(function (err, inst){
                     
                 for (var i = 0; i < inst.length; i++) {
                    result.push(inst[i]);                    
              }    
                    
                 });
            db.collection('glissade', function (err, collection) {
                if (err) {
                    db.close();
                    console.log(err);
                } else {
              cursor  =  collection.find({"ARRONDISSE": { $regex: '.*' + arrond + '.*', $options:'i' }});
              cursor.toArray(function (err, inst){
                     
                 for (var i = 0; i < inst.length; i++) {
                    result.push(inst[i]);                    
              }    
                    
                 });
                                
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
    
    getInstallation: function(instal, res) {
    var result = [];
    db.getConnection(function(err, db) {
        db.collection('patinoire', function(err, collection) {
            if (err) {
                db.close();
                res(err);
            } else {
                var cursor = collection.find();
                cursor.toArray(function(err, inst) {

                    for (var i = 0; i < inst.length; i++) {
                        result.push(inst[i]);
                    }

                });
                db.collection('glissade', function(err, collection) {
                    if (err) {
                        db.close();
                        res(err);
                    } else {
                        cursor = collection.find();
                        cursor.toArray(function(err, inst) {

                            for (var i = 0; i < inst.length; i++) {
                                result.push(inst[i]);
                            }

                        });

                        db.collection('picsines', function(err, collection) {
                            if (err) {
                                db.close();
                                res(err);
                            } else {
                                cursor = collection.find();
                                cursor.toArray(function(err, inst) {

                                    for (var i = 0; i < inst.length; i++) {
                                        result.push(inst[i]);
                                    }
                                    res(null, result);
                                });
                            }
                        });

                    }
                });

            }
        });
    });

},

    getInstallationParId: function(id, res) {
    var result = [];
    db.getConnection(function(err, db) {
        db.collection('patinoire', function(err, collection) {
            if (err) {
                db.close();
                res(err);
            } else {
                var cursor = collection.find({_id: ObjectId(id)});
                cursor.toArray(function(err, inst) {

                    for (var i = 0; i < inst.length; i++) {
                        result.push(inst[i]);
                    }

                });
                db.collection('glissade', function(err, collection) {
                    if (err) {
                        db.close();
                        res(err);
                    } else {
                        cursor = collection.find({_id: ObjectId(id)});
                        cursor.toArray(function(err, inst) {

                            for (var i = 0; i < inst.length; i++) {
                                result.push(inst[i]);
                            }

                        });

                        db.collection('picsines', function(err, collection) {
                            if (err) {
                                db.close();
                                res(err);
                            } else {
                                cursor = collection.find({_id: ObjectId(id) });
                                cursor.toArray(function(err, inst) {

                                    for (var i = 0; i < inst.length; i++) {
                                        result.push(inst[i]);
                                    }
                                    res(null, result);
                                });
                            }
                        });

                    }
                });

            }
        });
    });

},

    getInstallation1: function(instal, res) {
    var result = [];
    if(instal == null)
        instal= "";
    db.getConnection(function(err, db) {
        db.collection('patinoire', function(err, collection) {
            if (err) {
                db.close();
                res(err);
            } else {
                var cursor = collection.find({
                    nom: {
                        $regex: '.*' + instal + '*.',
                        $options: 'i'
                    }
                });
                cursor.toArray(function(err, inst) {

                    for (var i = 0; i < inst.length; i++) {
                        result.push(inst[i]);
                    }

                });
                db.collection('glissade', function(err, collection) {
                    if (err) {
                        db.close();
                        res(err);
                    } else {
                        cursor = collection.find({
                            nom: {
                                $regex: '.*' + instal + '*.',
                                $options: 'i'
                            }
                        });
                        cursor.toArray(function(err, inst) {

                            for (var i = 0; i < inst.length; i++) {
                                result.push(inst[i]);
                            }

                        });

                        db.collection('picsines', function(err, collection) {
                            if (err) {
                                db.close();
                                res(err);
                            } else {
                                cursor = collection.find({
                                    nom: {
                                        $regex: '.*' + instal + '*.',
                                        $options: 'i'
                                    }
                                });
                                cursor.toArray(function(err, inst) {

                                    for (var i = 0; i < inst.length; i++) {
                                        result.push(inst[i]);
                                    }
                                    res(null, result);
                                });
                            }
                        });

                    }
                });

            }
        });
    });

},

    getCondition : function (etat, res) {
        
        db.getConnection(function(err, db) {
            db.collection('patinoire', function(err, collection) {
                if (err) {
                    db.close();
                    res(err);
                } else {
                    var cursor = collection.find({condition: { $regex: '.*' + etat + '.*', $options:'i' }}).sort({nom:1});
                    var result = [];
                    cursor.toArray(function(err, inst) {
                         
                    for (var i = 0; i < inst.length; i++) {
                        result.push(inst[i]);
                    }

                });
                db.collection('glissade', function(err, collection) {
                    if (err) {
                        db.close();
                        res(err,[]);
                    } else {
                        cursor = collection.find({ condition: { $regex: '.*' + etat + '.*', $options:'i' }}).sort({nom :1});
                        cursor.sort().toArray(function(err, inst) {

                            for (var i = 0; i < inst.length; i++) {
                                result.push(inst[i]);
                            }
                                
                                res(null, sortByKey(result,'nom'));
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
    
    insertion: function(res) {

    var patinoires_json = "",
        piscines_json = [],
        glissades_json = "";

    request(url2, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        if (response.statusCode >= 200 && response.statusCode < 400) {

            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            parseString(body, function(err, result) {
                patinoires_json = result.patinoires.patinoire;

                if (err) {
                    res(err);
                }
                db.getConnection(function(err, db) {
                    if (err) {
                        console.log("Cannot connect to DB!");
                        res(err);
                    }

                    db.createCollection('patinoire', function(err, collection) {
                        if (err) {
                            console.log("Cannot create the collection!");
                            res(err);;
                        }
                        console.log("Collection created");
                        collection.insert(patinoires_json, {w: 1 }, function(err, doc) {
                            if (err) {
                                console.log("Erreur d\'insertion dans la collection patinoires");
                                res(err);
                            }
                           // collection.updateMany({}, {"$set": {"Instalation":"Patinoire"}});
                            console.log("Les insertion est fait");
                            collection.find().forEach(
                                function(elem) {
                                    // update document, using its own properties
                                    collection.update({'_id': elem._id}, { $set: { 'ARRONDISSE': elem.arrondissement[0].nom_arr, 'Instalation':'patinoire'}});
                                });    
                            request(url3, function(error, response, body) {
                                console.log('error:', error); // Print the error if one occurred
                                if (response.statusCode >= 200 && response.statusCode < 400) {
                                    parseString(body, function(err, result) {
                                        glissades_json = result.glissades.glissade;
                                        if (err) {
                                            res(err);
                                        }
                                        db.createCollection('glissade', function(err, collection) {
                                            if (err) {
                                                console.log("Cannot create the collection!");
                                                res(err);
                                            }
                                            console.log("Collection created");
                                            collection.insert(glissades_json, {w: 1}, function(err, doc) {
                                                if (err) {
                                                    console.log("Erreur d\'insertion dans la collection glissade!");
                                                    res(err);
                                                }
                                                collection.find().forEach(
                                                    function(elem) {
                                                        // update document, using its own properties
                                                        collection.update({
                                                            '_id': elem._id
                                                        }, { $set: {'ARRONDISSE': elem.arrondissement[0].nom_arr , 'Instalation':'glissade'} });
                                                    });  
                                                csv().fromStream(request.get(url1)).on('json', (body) => {
                                                    //console.log("second");

                                                    piscines_json.push(body);
                                                }).on('done', (err) => {
                                                    if (err) {
                                                        body(err);
                                                    }
                                                    console.log("Connected");
                                                    // Create the collection
                                                    db.createCollection('picsines', function(err, collection) {
                                                        if (err) {
                                                            console.log("Cannot create the collection!");
                                                            res(err);
                                                        }
                                                        console.log("Collection created");
                                                        collection.insert(piscines_json, { w: 1}, function(err, doc1) {
                                                            if (err) {
                                                                res(err);
                                                            }else {
                                                            collection.updateMany({}, {$rename:{'NOM':'nom'}, $set : {'Installation':'picsines'} }, function(err, doc) {
                                                                if (err) {
                                                                res(err);
                                                            }
                                                               res(null);
                                                            });
                                                        }
                                                        });
                                                        
                                                    });
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
        }
    });
},

//D1

    modifierGlissadParId : function(req, res){
        var id = req.body._id; 
        var glissade_json = req.body;
        console.log(glissade_json);
        db.getConnection(function(err, db) {
			if (err) {
				res.status(500).json(getErr.connexion_bd());
				console.log(getErr.connexion_bd().erreur.red);
			} else {
				db.collection('glissade', function(err, collection) {
					if (err) {
						res.status(500).json(getErr.collection('glissade'));
						console.log(getErr.collection('glissade').erreur.red);
					} else {
						collection.findAndModify({ '_id': ObjectId(id) }, [], { $set: glissade_json }, { new:true }, function(err, body) {
							if (err || !body) {
								//res.status(400).json(getErr.insert('glissade'));
								console.log(getErr.insert('glissade').erreur.red);
							} else {
								res.status(200).json(body);
							}
						});
					}
				});
			}
		});
        
    },

    //D2 deleteOneInstallationsById : 

    supprimeInstalParId :  function(inst, id, res) {

	db.getConnection(function(err, db) {
		db.collection(inst, function(err, collection){
			if(err) {
				res(err);
			} else {
				collection.deleteOne({"_id": ObjectId(id)}, function(err, result) {
                                    
					if(err || result.result.n == 0) {
						res(500);
					} else {
						res(null,result);
					}
				});
			}
		})
	})
}
		
	
 
    
};

