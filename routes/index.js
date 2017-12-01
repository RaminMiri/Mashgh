var express = require('express');
var router = express.Router();
var db = require('../db/query');
var raml = require('raml2html');
var path = require('path');
var schedule = require('node-schedule');
const ramlFile = path.join(__dirname, 'route.raml');


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
   var arrond = req.query.arrondissement;


        db.getInstallation(arrond, function (err, data) {
            if(err) {             
                res.status(500).json({error:"Internal Server Error"});
            } else {

                res.render('index', {title: 'Instalations', dd : data});
            }
        });
});

router.get('/installations', function (req, res) {
    var instal = req.query.installation;

    if(instal != null ) {
        db.getInstallation(instal, function (err, data) {
            if(err) {             
                res.status(500).json({error:"Internal Server Error"});
            } else {
                //res.header("Content-Type", "application/json");
                res.render('index', {title: 'Instalations', dd : data});
            }
        });
    } else {
        res.json({error: "Il y a aucune installation dans ce quartier! Veuillez cherchait à nouveau"});
    }
});

//D2
router.delete('/glissade/:id', function(req, res) {
	var id = req.params.id;
	 if(arrond != null && arrond != "") {             
        db.supprimeGlissadParId(id, function (err, data){
                 if(err) {             
                res.status(500).json({error:"Internal Server Error"});
            } else {
                res.header("Content-Type", "application/json");
                res.json(data);
            }   
                });
            }else {
                res.json({error: "Il y a aucune Glissade avec cet Id! Veuillez cherchait à nouveau"});
 
            }
});

module.exports = router;