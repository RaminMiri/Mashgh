/* global __dirname, data */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
const url1 = "http://donnees.ville.montreal.qc.ca/dataset/4604afb7-a7c4-4626-a3ca-e136158133f2/resource/cbdca706-569e-4b4a-805d-9af73af03b14/download/piscines.csv";
const url2 = "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml";
const url3 = "http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_GLISSADE.xml";

/*
 *	INF4375 
 *	Miri Ramin MIRR16098007
 */
var fs 	= require ('fs'),
	//xml_dom = require ( 'xmldom' ),
        client_mongo = require ( 'mongodb' ).MongoClient,
	//object_id = require ( 'mongodb' ).ObjectID,
        parseString = require('xml2js').parseString,
        request = require('request');

var patinoires_json = [],
	piscines_json = [],
	glissades_json = [],
        piscinnesCsv = [],
        patinoiresXml = [],
        glissadesXml = [];


request(url1, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  if (response.statusCode >= 200 && response.statusCode < 400) {
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  piscinnesCsv = body;
  }
});
 
 request(url2, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  if (response.statusCode >= 200 && response.statusCode < 400) {
  
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    parseString(body, function (err, result) {
    patinoires_json = result;
    });
   }
});

request(url3, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  if (response.statusCode >= 200 && response.statusCode < 400) {
  
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  parseString(body, function (err, result) {
     glissades_json = result;
    });
   }
});


var inserer_collections_dans_bd  = function (){
    client_mongo.connect("mongodb://localhost:27017/MIRR16098007", function(err, db) {
	if(err) {
		console.log("Cannot connect to DB!");
		throw err;
	}
	console.log("Connected");

	// Create the collection
	db.createCollection('patinoire', function(err, collection) {
		if(err) {
			console.log("Cannot create the collection!");
			throw err;
		}
		console.log("Collection created");
		collection.insert(patinoires_json, {w: 1}, function(err, doc){
			if(err) {
				console.log("Cannot add product in that collection!");
				throw err;
			}
			console.log("Products inserted");
			// don't forget to close the connexion after use!
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
				console.log("Cannot add product in that collection!");
				throw err;
			}
			console.log("Products inserted");
			// don't forget to close the connexion after use!
			db.close();
		});
	});
});

}

 //Inserer le JSONObject ´json_object´ dans la collection ´nom_collection´
//function inserer_collection ( db, nom_collection, json_object ) {
//	db.createCollection ( nom_collection, function ( err, collection ) {
//		if ( err ) {
//                    console.log(err);
//			throw 'Erreur dans la creation de la collecction ' + nom_collection;
//		}
//
//		collection.insert( json_object, { w:1 }, function ( err, result ) {
//			if ( err ) {
//                            console.log(err);
//				throw 'Erreur d\'insertion dans la collection ' + nom_collection;
//			} else {
//				console.log ( 'Insertion avec succes dans la collection ' + nom_collection );
//			}
//		});
//	});
//}
// 
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


/*
 *	Parser le fishier xml ´fichier´ et returner son ´domRoot´
 
function parser_fichier_xml ( fichier, callback ) {
	console.log ( 'Lire le fichier ' + fichier + ' ...');
	
	fs.readFile ( fichier, function ( err, data ) {
		if ( err ) {
			throw 'Erreur de lecture du fichier ' + fichier;
		} else {
			var domRoot = new xml_dom.DOMParser ().parseFromString ( data.toString () );
			console.log ( 'Lecture avec succes du fichier ' + fichier );
			callback ( domRoot );
		}
	});
}


function convertir_date_en_format_iso ( date ) {
	var date_iso = new Date ( date );
	
	return date_iso.toISOString ();
}

/*
 *	Creation du patinoires_json
 
function creer_patinoires_json ( domCatalog ) {	
	var nom, arrondissement, nom_arr, cle, date_maj,
              ouvert,  ouvert, deblaye, arrose , resurfacé, condition,
		i 			= 0,
		patinoires 	= domCatalog.getElementsByTagName ( 'patinoire' ),
		nb_patinoires 	= patinoires.length;
	
	for ( ; i < nb_patinoires ; i++ ) {
		patinoire = patinoires[i],
		nom	= patinoire.getElementsByTagName ( 'nom')[0].textContent,
		arrondissement	= patinoire.getElementsByTagName ( 'arrondissement')[0],
		nom_arr	= arrondissement.getElementsByTagName ( 'date')[0].textContent;
		
		date = convertir_date_en_format_iso ( date );
		
		patinoires_json.push (
			{
				professionnel:	professionnel,
				patient:		patient,
				date:			date
			}
		);
	}
	
	console.log ( 'Parser visites avec succes' );
	
	console.log ( 'Creation du piscines_json ...' );
	parser_fichier_xml ( 'dossiers.xml', creer_piscines_json );
}

/*
 *	Creation du piscines_json
 
function creer_piscines_json ( domCatalog ) {
    var dossier, id, sexe, nom, prenom, date_naissance, groupe_sanguin,
		poids_kg, don_organes, visites, visite, nb_visites,
		i 			= 0,
		dossiers 	= domCatalog.getElementsByTagName ( 'dossier' ),
		nb_dossiers	= dossiers.length;
	
	for ( ; i < nb_dossiers; i++ ) {
		dossier	= dossiers[i];
		id = dossier.getElementsByTagName ( 'id')[0].textContent,
		sexe = dossier.getElementsByTagName ( 'sexe'	)[0].textContent,
		nom = dossier.getElementsByTagName ( 'nom')[0].textContent,
		prenom	= dossier.getElementsByTagName ( 'prenom')[0].textContent,
		date_naissance	= dossier.getElementsByTagName ( 'dateNaissance')[0].textContent,
		groupe_sanguin	= dossier.getElementsByTagName ( 'groupeSanguin')[0].textContent,
		poids_kg = dossier.getElementsByTagName ( 'poidsKg')[0].textContent,
		taille_cm = dossier.getElementsByTagName ( 'tailleCm')[0].textContent,
		don_organes = dossier.getElementsByTagName ( 'donOrganes')[0].textContent;
		visites	= [];
		nb_visites = patinoires_json.length;
		
		for ( var j = 0; j < nb_visites; j++ ) {
			visite = patinoires_json[j];
			
			var id_professionnel = new object_id.createFromHexString ( visite.professionnel );
			
			if ( visite.patient == id ) {
				visites.push (
					{
						_id: 	id_professionnel,
						date:	visite.date
					}
				);
			}
		}
		
		id			= new object_id.createFromHexString ( id );
		sexe 		= parseInt ( sexe );
		date_naissance = convertir_date_en_format_iso ( date_naissance );
		poids_kg 	= parseFloat ( poids_kg );
		taille_cm 	= parseFloat ( taille_cm );
		don_organes = don_organes == 0 ? false : true;
		
		piscines_json.push (
			{
				_id:			id,
				sexe:			sexe,
				nom:			nom,
				prenom:			prenom,
				date_naissance:	date_naissance,
				groupe_sanguin:	groupe_sanguin,
				poids_kg:		poids_kg,
				taille_cm:		taille_cm,
				don_organes:	don_organes,
				visites:		visites
			}
		);
	}
	
	console.log ( 'Parser dossiers avec succes' );
	
	console.log ( 'Creation du glissades_json ...' );
	parser_fichier_xml ( 'professionnels.xml', create_glissades_json );
}

/*
 *	Completer piscines_json

function completer_piscines_json () {
	var nb_patients	= piscines_json.length;
	for (var i = 0; i < nb_patients; i++ ) {
		var visites 	= piscines_json[i].visites,
			nb_visites 	= visites.length;
		for ( var j = 0; j < nb_visites; j++ ) {
			var visite = visites[j];
			
			var nb_professionels = glissades_json.length;
			for ( var k = 0; k < nb_professionels; k++ ) {
				var professionel = glissades_json[k];
				
				if ( professionel._id.equals ( visite._id ) ) {
					visite.nom 			= professionel.nom;
					visite.prenom 		= professionel.prenom;
					visite.specialite	= professionel.specialite;
					break;
				}
			}
		}
	}
	
	inserer_collections_dans_bd ();
}

/*
 *	Inserer une JSONObject dans une collection 
 
function create_patinoires_json ( domCatalog ) {	
	var patinoires	= domCatalog.getElementsByTagName ( 'patinoire' );
	
	for ( var i = 0; i < patinoires.length; i++ ) {
		var patinoire = patinoires[i];
		
		var nom	= patinoire.getElementsByTagName ( 'nom')[0].textContent;
		var arrondissement = patinoire.getElementsByTagName ( 'arrondissement')[0].textContent;
		var nom_arr = patinoire.getElementsByTagName ( 'nom_arr')[0].textContent;
		var cle = patinoire.getElementsByTagName ( 'cle')[0].textContent;
		var date_maj = patinoire.getElementsByTagName ( 'date_maj')[0].textContent;
		var ouvert = 0;
		var deblaye = 0;
		var arrose = [];
		var resurface = [];
		var condition = [];
		patinoires_json.filter ( function ( visite ) {
			if ( visite.professionnel == id ) {
				var id_patient 	= visite.patients;
				var date_visite = visite.date;
				var deja_visite = false;
				
				total_visites++;
				
				var nb_patients	= patients.length;
				for ( var j = 0; j < nb_patients; j++ ) {
					var patient = patients[j];
					
					if ( patient.id_patient == id_patient ) {
						deja_visite = true;
						patient.dates.push ( { date: date_visite } );
					}
				}
				
				if ( !deja_visite ) {
					nb_total_patients++;
					patients.push (
						{
							id_patient:	visite.patient,
							dates: 		[ { date: date_visite } ]
						}
					);
				}
			}
		});
		
		patients.filter ( function ( patient ) {
			var dates = patient.dates;
			
			for ( var i = 0; i < dates.length; i++ ) {
				var date_courante 	= new Date ( dates[i].date ),
					id_patient		= patient.id_patient;
				
				if ( date_courante.getFullYear () == "2014") {
					var nb_patients = piscines_json.length;
					for ( var j = 0; j < nb_patients; j++ ) {
						var patient = piscines_json[j];
						
						if ( patient._id == id_patient ) {
						
							id_patient = new object_id.createFromHexString ( id_patient );
						
							patients_2014.push (
								{
									_id:	id_patient,
									nom:	patient.nom,
									prenom:	patient.prenom
								}
							);
							break;
						}
					}
					break;
				}
			}
		});
		
		id		= new object_id.createFromHexString ( id );
		sexe	= parseInt ( sexe );
		
		glissades_json.push (
			{
				_id:	id,
				sexe:				sexe,
				nom:				nom,
				prenom:				prenom,
				specialite:			specialite,
				nb_total_visites:	total_visites,
				nb_total_patients:	nb_total_patients,
				patients_2014:		patients_2014
			}
		);
	}
	
	console.log ( 'Parser professionnels avec succes' );
	
	completer_piscines_json ();
}

console.log ( 'Creation du patinoires_json ...' );
parser_fichier_xml ( 'visites.xml', creer_patinoires_json );


*/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// view engine setup


// catch 404 and forward to error handler
exports.inserer_collections_dans_bd = inserer_collections_dans_bd ;

//inserer_collections_dans_bd ();