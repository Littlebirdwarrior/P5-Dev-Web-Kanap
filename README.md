# Kanap - Site e-commerce en JavaScript

**Projet-Openclassrooms** : <br/>
Parcours Web développeur - 2021

**Projet n°5** : "Construisez un site e-commerce en JavaScript "

![kanap](https://user-images.githubusercontent.com/82466002/203118447-fadc1fb4-2da5-47bb-a12c-ccad68736ac4.png)

## Description du projet 
Votre client est Kanap, une marque de canapés qui vend ses produits depuis sa boutique exclusivement. Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.

En savoir plus sur : https://openclassrooms.com/fr/paths/185/projects/675/assignment

## Spécifications techniques

L’application web sera composée de 4 pages :
- Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à
la vente.
- Une page “produit” qui affiche (de manière dynamique) les détails du produit sur
lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur
peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.
- Une page “panier”. Celle-ci contient plusieurs parties :
  - Un résumé des produits dans le panier, le prix total et la possibilité de
modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
  - Un formulaire permettant de passer une commande. Les données du
formulaire doivent être correctes et bien formatées avant d'être renvoyées au
back-end. Par exemple, pas de chiffre dans un champ prénom.
- Une page “confirmation” :
  - Un message de confirmation de commande, remerciant l'utilisateur pour sa
commande, et indiquant l'identifiant de commande envoyé par l’API.
  - Il faudra veiller à ce que ce numéro de commande ne soit stocké nulle part.
  
## Compétences évaluées

- Créer un plan de test pour une application
- Valider des données issues de sources externes
- Interagir avec un web service avec JavaScript
- Gérer des événements JavaScript

## Installation

Ce repo contient le front et le serveur back end de ce projet

### Prérequis Back end ###

Node and `npm` sont requis localement sur votre machine.

### Back end Installation ###

1- Clone this repo. 
2- From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
3- The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.
