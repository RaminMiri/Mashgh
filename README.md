## Ramin Miri MIRR16098007
## Projet de INF4375. Les modules complétés:

- A1, A2, A3, A4, A5, A6
- C1, C2, C3
- D1, D2, D3->1/2

## Instructions pour construire la base de données ##

- Lancer l'exécutable `mongod` en spécifiant le paramètre `--dbpath=` vers le chemin où la base de données va être stockée sur le disque dur.
- Dans le répertoire `MIRR16098007` lancer la commande `npm install` pour installer les dépandances du script de migration
- Dans le répertoire `MIRR16098007` lancer la commande 
    node import.js
- Dans la racine du projet lancer la commande `npm start` pour lancer l'application

## Accéder à la documentation des services ##

La documentation des services se trouve dans:
- localhost:3000/doc

###Bugs
- chacque fois pour recevoire la liste des installations avec Mauvaise condition en different format , il faut partire le server a nouveau
- si l'import marche pas , donc faut creer le data base MIRR16098006 avant tous ca.