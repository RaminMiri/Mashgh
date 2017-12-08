var express = require('express');
var router = express.Router();
var db = require('../db/query');
var raml = require('raml2html');
var path = require('path');
var schedule = require('node-schedule');
const ramlFile = path.join(__dirname, 'route.raml');
var jsonschema = require('jsonschema');
var schemas = require('../schemas/modifGlissade'); 
var getErr = require('../err/err');

///* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});
//A2
var time = new schedule.RecurrenceRule();
time.hour = '*';
time.minute = '*';
schedule.scheduleJob(time, function() {
    db.insertion(function (err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Import completed!");
        }
    });
});
//A3
router.get('/doc', function (req, res) {
    //pris des exemples de Jacques Berger INF4375
    var config = raml.getConfigForTheme('raml2html-default-theme');
    var onError = function (err) {
        res.sendStatus(500);
    };
        var onSuccess = function(html) {
        res.send(html);
    };
    raml.render(ramlFile, config).then(onSuccess, onError);
});
//A4
router.get('/installations', function (req, res) {
    var arrond = req.query.arrondissement;

    if(arrond != null && arrond != "") {
        db.getArrondissement(arrond, function (err, data) {
            if(err) {             
                res.status(500).json({error:"Internal Server Error"});
            } else {
                res.header("Content-Type", "application/json");
                res.json(data);
            }
        });
    } else {
        res.json({error: "Il y a aucune installation dans ce quartier! Veuillez cherchait à nouveau"});
    }
});

//A5 + A6
router.get('/', function (req, res) {
   var instal = req.query.instalation;
        db.getInstallation(instal, function (err, data) {
            if(err) {             
                res.status(500).json({error:"Internal Server Error"});
            } else {

                res.render('index', {title: '  les données de la Ville Montréal', dd : data});
                res.end();
            }
        });
});

router.get('/nominstallations', function (req, res) {
    var instal = req.query.installation;

    if(instal != null ) {
        db.getInstallation1(instal, function (err, data) {
            if(err) {             
                res.status(500).json({error:"Internal Server Error"});
            } else {
             res.json(data);
            }
        });
    } else {
        res.json({error: "Il y a aucune installation dans ce quartier! Veuillez cherchait à nouveau"});
    }
});

router.get('/installations/condition/:etat', function (req, res) {
        var etat = req.params.etat;
        db.getCondition(etat, function (err, data) {
            if(err) {             
                res.status(500).json({error:"Internal Server Error"});
            } else {
                res.header("Content-Type", "application/json");
                res.json(data);
            }
        });
});

//D1
router.put('/installations/glissade', function(req, res) {
        var body = req.body._id ;

        var result = jsonschema.validate(req.body, schemas.modifyGlissade);
        if(result.errors.length > 0) {
        var err = getErr.json();
		err.erreures_validation = result.errors;
		res.status(400).json(result);
    } else {
        db.modifierGlissadParId( body, function (err, data) {
            if(err) {
                res.status(400).json(getErr.insert('glissade'));
            } else {
                res.status(200).json(req.body);
            }
        });
    }
});


//D2
router.delete('/installations', function(req, res) {
	var id = req.query.id; 
        var inst = req.query.installation;
        
        db.supprimeInstalParId(inst, id, function (err, data){
                 if(err) {             
                res.status(500).json({error:id+" N'existe pas"});
            } else {
                res.header("Content-Type", "application/json");
                res.json({confirmation: id + " est supprime"});
            }   
                });
});

//D3
router.get('/switch', function (req, res) {
    var id = req.query.id;
    db.getInstallationParId(id, function (err, data) {
        if(err || data.length == 0) {
        res.status(500).json(getErr.service('GET','/switch' ));
        } else {
            res.render('modify', {contrevenant : data[0]});
        }
    });
});

module.exports = router;