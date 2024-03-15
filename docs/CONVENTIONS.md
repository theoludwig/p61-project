# Conventions développement informatique

## Linting/Formatting/Tests

Le code est formaté grâce à [Prettier](https://prettier.io/) et vérifié grâce à [ESLint](https://eslint.org/) et à [TypeScript](https://www.typescriptlang.org/) pour s'assurer que le code respecte les bonnes pratiques de développement, et détecter en amont les possibles erreurs.

Nous utilisons également [Jest](https://jestjs.io/) pour les tests automatisés.

```sh
# Lint
npm run lint:prettier
npm run lint:eslint
npm run lint:typescript

# Test
npm run test
```

Une pipeline CI ([`.gitlab-ci.yml`](.gitlab-ci.yml)) est en place pour vérifier que le code respecte ces bonnes pratiques et que les tests passent.

## GitFlow

Le projet suit la convention [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/) reposant sur 2 branches principales:

- `main` (ou `master`): Contient le code de la dernière version stable et déployé en production.
- `develop`: Contient le code en cours de développement. Les nouvelles fonctionnalités et les correctifs de bugs sont fusionnés ici.

## Convention des commits

Les commits respectent la convention [Conventional Commits](https://www.conventionalcommits.org/) et [Semantic Versioning](https://semver.org/) pour la gestion des versions et des releases en fonction des commits.

Les commits doivent être **atomiques** c'est à dire qu'il respecte 3 règles:

- Ne concerne qu'un seul sujet (une fonctionnalité, une correction de bug, etc.)
- Doit avoir un message clair et concis
- Ne doit pas rendre de dépôt "incohérent" (bloque la CI du projet)
