# Habits Tracker - P61 Projet

## À propos

Application mobile en [React Native](https://reactnative.dev/) pour le projet du module P61 Développement avancé.

Un tracker d'habitudes pour performer au boulot et dans la vie de tous les jours.

<p align="center">
  <img src="./docs/screenshots/habits.png" alt="Habits Tracker Screenshot" height="400px" />
</p>

### Membres du Groupe 7

- [Théo LUDWIG](https://git.unistra.fr/t.ludwig)
- [Haoxuan LI](https://git.unistra.fr/haoxuan.li)
- [Maxime RUMPLER](https://git.unistra.fr/m.rumpler)
- [Maxime RICHARD](https://git.unistra.fr/maximerichard)

### Documentation

- [Sujet](./docs/SUJET.md) + [Cahier des charges](./docs/CAHIER-DES-CHARGES.md)
- [Modèle Logique des Données (MLD)](./docs/MLD.md)
- [Conventions développement informatique](./docs/CONVENTIONS.md)
- [Kanban Board (Trello)](https://trello.com/b/8kYlcLA8/habits-tracker)

#### Principaux Outils Informatiques Utilisés

- [TypeScript](https://www.typescriptlang.org/): Langage de programmation.
- [React Native](https://reactnative.dev/) + [Expo](https://expo.io/): Framework pour le développement d'applications mobiles.
- [React Native Paper](https://callstack.github.io/react-native-paper/): Bibliothèque de composants pour React Native.
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/): Gestion des formulaires et validation des données.
- [Supabase](https://supabase.io/): Backend, serveur d'API pour le stockage des données.

## Développement du projet en local

### Prérequis

- [Node.js](https://nodejs.org/) >= 20.0.0
- [npm](https://www.npmjs.com/) >= 10.0.0
- [Expo Go](https://expo.io/client) ~2.31.0
- [Docker](https://www.docker.com/) (facultatif, utilisé pour lancer [Supabase](https://supabase.io/) en local)

### Installation

```sh
# Cloner le projet
git clone git@github.com:theoludwig/p61-project.git

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

Ce n'est pas strictement nécessaire pour le développement de l'application (même si recommandé), de lancer [Supabase](https://supabase.io/) en local, car l'application est déjà déployée sur un serveur [Supabase](https://supabase.io/) en production (`.env.example` est pré-configuré avec cet environnement).

```sh
npm run supabase-cli start
```

#### Principales Commandes Supabase

```sh
# Pour réinitialiser la base de données avec les données de test (seed.sql)
npm run supabase-cli db reset

# Pour synchroniser le modèle (local) avec la base de données (remote)
npm run supabase-cli db pull

# Pour synchroniser la base de données (remote) avec le modèle (local)
npm run supabase-cli db push

# Pour générer les types TypeScript
npm run supabase-cli gen types typescript -- --local > ./infrastructure/supabase/supabase-types.ts

# Crée un nouveau script de migration à partir des modifications déjà appliquées à votre base de données locale (remplacer `<name-of-migration>` avec le nom de la migration)
npm run supabase-cli db diff -- -f <name-of-migration>
```
