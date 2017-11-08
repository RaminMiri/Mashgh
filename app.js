/* global __dirname, data */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');
const csv = require('csvtojson');
var schedule = require('node-schedule');
var db = require('./db/db.js');
var routes = require('./routes/index');
var app = express();
var app = express();
app.use('/', routes);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

const url1 = "http://donnees.ville.montreal.qc.ca/dataset/4604afb7-a7c4-4626-a3ca-e136158133f2/resource/cbdca706-569e-4b4a-805d-9af73af03b14/download/piscines.csv";
const url2 = "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml";
const url3 = "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_GLISSADE.xml";

/*
 *	INF4375 
 *	Miri Ramin MIRR16098007
 */
var fs 	= require ('fs'),
       
	//object_id = require ( 'mongodb' ).ObjectID,
        parseString = require('xml2js').parseString,
        request = require('request');

var patinoires_json = "",
	piscines_json = [],
	glissades_json = "",
        piscinesCsv = [],
        patinoiresXml = [],
        glissadesXml = [];

csv().fromStream(request.get(url1)).on('json',(body)=>{
    
    piscines_json.push(body);
  
}).on('done',(err)=>{
            console.log(err);
    });
 
 request(url2, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  if (response.statusCode >= 200 && response.statusCode < 400) {
  
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    parseString(body, function (err, result) {
    patinoires_json = result.patinoires.patinoire;
    //console.log(patinoires_json);
    });
   }
});

request(url3, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  if (response.statusCode >= 200 && response.statusCode < 400) {
  
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  parseString(body, function (err, result) {
     glissades_json = result.glissades.glissade;
    });
   }
});


var inserer_collections_dans_bd  = function (){
     db.getConnection(function(err, db) {
	if(err) {
		console.log("Cannot connect to DB!");
		throw err;
	}
	console.log("Connected");
 db.listCollections().toArray(function(err, collInfos) {
             // collInfos is an array of collection info objects that look like:
             collInfos.forEach(function(collName) {
                    if (!collName.name) {
                        console.log(collName.name);
                        console.log("Dropping ["+collName.name+"]");
                        db.collName.name.drop();
                        
    }
});
   
                });

	// Create the collection
	db.createCollection('patinoire', function(err, collection) {
		if(err) {
			console.log("Cannot create the collection!");
			throw err;
		}
		console.log("Collection created");
		collection.insert(patinoires_json, {w: 1}, function(err, doc){
			if(err) {
				console.log("Erreur d\'insertion dans la collection patinoires");
				throw err;
			}
			console.log("Les insertion est fait");
			db.close();
		});
	});
        db.createCollection('glissade', function(err, collection) {
		if(err) {
			console.log("Cannot create the collection!");
			throw err;
		}
		console.log("Collection created");
		collection.insert(glissades_json, {w: 1}, function(err, doc){
			if(err) {
				console.log("Erreur d\'insertion dans la collection glissade!");
				throw err;
			}
			console.log("Insertion avec succes dans la collection");
			// don't forget to close the connexion after use!
			db.close();
		});
	});
        db.createCollection('picsines', function(err, collection) {
		if(err) {
			console.log("Cannot create the collection!");
			throw err;
		}
		console.log("Collection created");
		collection.insert(piscines_json, {w: 1}, function(err, doc){
			if(err) {
				console.log(piscines_json);
				throw err;
			}
			console.log("Les insertion est fait");
			db.close();
		});
	});
});

};

 //Inserer le JSONObject ´json_object´ dans la collection ´nom_collection´
function inserer_collection ( db, nom_collection, json_object ) {
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
}
 
// //	Inserer les collections ´dossiers´ et ´professionnels´ dans la bd
// //	Source : https://github.com/Morriar/INF4375-mongodb/blob/master/exercice5.js
// 
//function inserer_collections_dans_bd () {
//	client_mongo.connect ( "mongodb://localhost:27017/MIRR16098007" ,function( err, db ) {
//	  if ( err ) {
//		throw 'Erreur de connection avec la bd';
//	  } else {
//		console.log ( 'Connexion avec succes au bd' );
//	  }
//	  
//	  console.log ( 'Inserer dans la collection patinoires ...' );
//	  inserer_collection ( db, 'patinoire', patinoires_json );
//	  
//	  console.log ( 'Inserer dans la collection glissades ...' );
//	  inserer_collection ( db, 'glissade', glissades_json );
//	  
//	  db.close ();
//	});
//}

 //	Sauvegarder le JSONObject ´json_object´ dans le fichier ´fichier´
//	Utilisé seulement pour le deboguage
 
function sauvegarder_fichier_json ( data, fichier ) {
	fs.writeFile ( fichier, JSON.stringify ( data, null, 4 ), function ( err ) {
		if ( err ) {
		  throw 'Erreur en souvegardant dans le fichier' + fichier;
		} else {
		  console.log ( 'Sauvegardé dans le fichier ' + fichier );
		}
	});
}
var rule = new schedule.RecurrenceRule();
rule.hour = '*';
rule.minute = '*';
inserer_collections_dans_bd();
//schedule.scheduleJob(rule, function() {
//    inserer_collections_dans_bd(function (err) {
//        if(err) {
//            console.log(err);
//        } else {
//            console.log("Import completed!");
//        }
//    });
//});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


module.exports = app;

// catch 404 and forward to error handler
