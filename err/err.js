// Source : http://stackoverflow.com/a/9134187/3029422, 13-11-2014, benekastah

function json(err_msg) {
	return {erreur: err_msg};
}

var getErr = module.exports = {

	service: function (method, url) {
		return json('La methode ' + method + ' sur ' + url + ' n\'est pas supporte. Consulter documentation.md pour la liste de services disponibles');
	},

	interne: function () {
		return json('Erreur interne au serveur');
	},

	connexion_bd: function () {
		return json('Erreur de connection avec la base de données.');
	},

	collection: function (nom_collection) {
		return json('Erreure d\'ouverture de la collection [' + nom_collection + '].');
	},

	recherche: function (nom_collection, id) {
		return json('La collection [' + nom_collection + '] ne contient pas l\'id [' + id + '].');
	},
	
	id: function (id) {
		return json('L\'id [' + id + '] n\'est pas valide. Le format accepte est 24 caracteres hexadecimaux.');
	},
	
	json: function () {
		return json('Le json n\'est pas valide');
	},
	
	insert: function (nom_collection) {
		return json('Erreure d\'insertion dans la collection [' + nom_collection + '].');
	},
	
	recemment_visite: function (id) {
		return json('Le dossier avec l\'id [' + id + '] ne peut pas etre enleve, car le patient a ete visite par un medecin dans les dernieres 5 ans.');
	},
	
	patients_2014: function (id) {
		return json('Le professionnel avec l\'id [' + id + '] ne peut pas etre enleve, car il a eu des visites en 2014.');
	}
}
