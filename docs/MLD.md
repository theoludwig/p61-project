# Modèle Logique des Données (MLD)

## Introduction

Le **Modèle Logique des Données (MLD)** est une représentation de la structure de la base de données de l'application.

On représente ainsi les données sous la forme suivante:

- Chaque table est représentée par un bloc.
- Le nom de la table est écrit en **gras**.
- Les champs sont listés en dessous du nom de la table.
- Les clés primaires sont <u>soulignées</u> et placées au début de la liste des champs.
- Les clés étrangères sont préfixées par un dièse (#), et placées après les clés primaires. Les clés étrangères sont suivies entre parenthèses du nom de la table suivi d'une flèche (->) et du nom du champ de la table référencée.

## Modèle

- **users**
  - <u>id</u>
  - email (unique)
  - display_name
  - encrypted_password
  - role
  - email_confirmed_at (nullable)
  - created_at
  - updated_at
- **habits**
  - <u>id</u>
  - #user_id (Users->id)
  - name
  - color
  - icon
  - start_date
  - end_date (nullable)
  - goal_frequency (enum: `daily`, `weekly`, `monthly`)
  - goal_target (nullable)
  - goal_target_unit (nullable)
- **habits_progresses**
  - <u>id</u>
  - #habit_id (Habits->id)
  - date
  - goal_progress
