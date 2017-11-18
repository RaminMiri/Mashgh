var express = require('express');
var router = express.Router();
var db = require('../db/query');
var mongodb = require('mongodb');
var raml = require('raml2html');
var path = require('path');
const ramlFile = path.join(__dirname, 'route.raml');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
        res.json({error: "Il Y A AUCUNE INSTALLATION DANS CE QUARTIER! VEULLEZ CHERCHER A NOUVEU"});
    }
});

module.exports = router;
