# P61 - Projet

## À propos

Application mobile en [React Native](https://reactnative.dev/) pour le projet du module P61 Développement avancé.

Un tracker d'habitudes pour performer au boulot et dans la vie de tous les jours.

### Membres du Groupe 7

- [Théo LUDWIG](https://git.unistra.fr/t.ludwig)
- [Haoxuan LI](https://git.unistra.fr/haoxuan.li)
- [Maxime RUMPLER](https://git.unistra.fr/m.rumpler)
- [Maxime RICHARD](https://git.unistra.fr/maximerichard)

### Documentation

- [Sujet](./docs/SUJET.md) + [Cahier des charges](./docs/CAHIER-DES-CHARGES.md)
- [Modèle Logique des Données (MLD)](./docs/MLD.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Conventions développement informatique](./docs/CONVENTIONS.md)

#### Principaux Outils Informatiques Utilisés

- [React Native](https://reactnative.dev/) + [Expo](https://expo.io/): Framework pour le développement d'applications mobiles.
- [TypeScript](https://www.typescriptlang.org/): Langage de programmation.
- [React Native Paper](https://callstack.github.io/react-native-paper/): Bibliothèque de composants pour React Native.
- [Supabase](https://supabase.io/): Backend, serveur d'API pour le stockage des données.
<!--
- [WatermelonDB](https://nozbe.github.io/WatermelonDB/): Base de données locale, pour permettre une utilisation hors-ligne de l'application.
  -->

## Développement du projet en local

### Prérequis

- [Node.js](https://nodejs.org/) >= 20.0.0
- [npm](https://www.npmjs.com/) >= 10.0.0
- [Expo Go](https://expo.io/client)
- [Docker](https://www.docker.com/) (facultatif, utilisé pour lancer [Supabase](https://supabase.io/) en local)

### Installation

```sh
# Cloner le projet
git clone git@git.unistra.fr:rrll/p61-project.git

# Se déplacer dans le répertoire du projet
cd p61-project

# Configurer les variables d'environnement
cp .env.example .env

# Installer les dépendances
npm clean-install
```

### Lancer l'application

```sh
npm run start
```

### Lancer Supabase (facultatif)

Ce n'est pas strictement nécessaire pour le développement de l'application (même si recommandé), de lancer [Supabase](https://supabase.io/) en local, car l'application est déjà déployée sur un serveur [Supabase](https://supabase.io/) en production.

```sh
npm run supabase
```
