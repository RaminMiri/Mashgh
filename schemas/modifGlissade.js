module.exports = {
modifyGlissade : {
  "type": "object",
  "properties": {
     "_id": {
      "type": "string"
    }, 
    "nom": {
      "type": "string"
    },
    "arrondissement": {
      "type": "object",
      "properties": {
        "nom_arr": {
          "type": "string"
        },
        "cle": {
          "type": "string"
        },
        "date_maj": {
          "type": "string"
        }
      },
      "required": [
        "nom_arr",
        "cle",
        "date_maj"
      ]
    },
    "ouvert": {
      "type": "string"
    },
    "deblaye": {
      "type": "string"
    },
    "condition": {
      "type": "string"
    }
  },
  "required": [
      "_id",
    "nom",
    "arrondissement",
    "ouvert",
    "deblaye",
    "condition"
  ]
}
};