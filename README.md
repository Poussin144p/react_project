# Plateforme de Réservation d'Événements

Ce projet est une plateforme web permettant aux utilisateurs de découvrir des événements, de réserver leurs places et de gérer leurs réservations.

## Fonctionnalités principales

L'application suit le cahier des charges et propose les fonctionnalités suivantes :

### Page d’accueil :
- Liste des événements sous forme de cartes avec visuel, titre, date, lieu et prix.
- Filtres dynamiques par date, catégorie et prix.
- Recherche par mot-clé.

### Page détaillée d’un événement :
- Description complète (image, texte, lieu, date, organisateur).
- Formulaire dynamique de réservation avec validation des champs.
- Limitation des réservations selon le nombre de places disponibles.

### Gestion du panier :
- Page récapitulant les réservations (nom de l'événement, date, prix total).
- Option pour modifier ou supprimer des réservations.
- Calcul dynamique du total.

### Persistance des données :
- Sauvegarde des réservations dans le Local Storage.
- Récupération automatique des données sauvegardées.

### UI/UX :
- Design clair, intuitif et responsive.
- **Bonus** : Implémentation d'un mode sombre.

## Installation et lancement

### Installer les dépendances :
```sh
npm install
```

### Démarrer l'application :
```sh
npm run dev
```

### Lancer le serveur JSON pour les données :
```sh
npx json-server api/db.json
```

## Technologies utilisées

- **React.js** pour l'interface utilisateur.
- **React Router** pour la navigation.
- **Local Storage** pour la persistance des données.
- **JSON Server** pour la gestion des données en local.

## Équipe

Ce projet a été réalisé par :

- [BESSE Jonathan]
- [MIAUD Matthis]

## Justification des choix techniques

- **React.js** : Framework moderne et performant pour le développement web.
- **React Router** : Gestion efficace de la navigation.
- **JSON Server** : Simule une API REST pour gérer les événements et réservations.
- **Local Storage** : Permet de conserver les réservations entre les sessions.

## Remarques

- Toutes les fonctionnalités principales attendues ont été implémentées.
- Des améliorations futures pourraient inclure des optimisations de performance et des ajouts de fonctionnalités.
