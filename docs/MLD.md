# Modèle Logique des Données (MLD)

## Introduction

Le **Modèle Logique des Données (MLD)** est une représentation de la structure de la base de données de l'application.

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
