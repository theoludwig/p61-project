# PROJET 🚧

Pas de temps à perdre, commençons dès aujourd'hui à travailler sur l'accompagnement du projet.
Pour celà, commençons par découvrir le [cahier des charges du projet](https://docs.google.com/document/d/1P1pD_TsTa8Cn4XT-hU0YF_xMx2BGqbXxG7Ta2oNcnOk/edit).

## 1 🚀 KICKSTART

### 1.1 Mettez vous par groupe

Renseignez ce fichier [Cahier des charges](./CAHIER-DES-CHARGES.md) avec le nom des étudiants de votre groupe

### 1.2 Créez votre projet

Rappel de la commande : `npx create-expo-app HabitsTracker --template` (vous pouvez choisir un autre nom)
Choisissez une application `blank`

### 1.3 GitLab

- Ajoutez ce projet sur le Gitlab de l'université
- Ajoutez les profs (@joeybronner et @g.baldi) en tant que "Reporter"
- Ajoutez tous les membres de votre groupe au projet

## 2 📱 DESIGN

### 2.1 Wireframes

Hep hep hep, avant de commencer à coder, prenez le temps de créer vos Wireframes (c'est quoi ?).
Vous pouvez utiliser une feuille et un crayon, mais je recommande l'utilisation de l'outil [Whimsical](https://whimsical.com/wireframes) pour la création de ces interfaces.

- Inscrivez vous sur [https://whimsical.com](https://whimsical.com)
- Invitez les autres membres de votre groupe à collaborer
- Créez un nouveau Wireframe (logo carré violet en haut)
- Déssinez les écrans et leur enchainement (Splashscreen -> Login -> Home -> ...)
- Invitez le prof à voir vos wireframes (<joeybronner@gmail.com>)

## 4 🏗 BUILD

A vos claviers !!

Pour ces deux dernières heures et la mise en place des composants essentiels du projet, je vous recommande de faire du [pair programming](https://fr.wikipedia.org/wiki/Programmation_en_bin%C3%B4me).

### 4.1 Structure du projet

Mettez-vous d'accord sur la structure et l'architecture du projet ⤵

🔗 [Google Slide | Bien structurer son projet](https://docs.google.com/presentation/d/1W0b7Na9pcBiR0KUDhLtvlV6x6oNgFo9X6l7KKpaYibU/edit#slide=id.gf85a3fda8d_1_223)

**!!  C'est important pour la suite et pour la maintenance du projet. !!**

### 4.2 SplashScreen *(optionnel mais recommandé =))*

Un Splashscreen est toujours plus élégant qu'un écran de lancement "tout moche", et en plus vous pouvez vous en servir pour charger des dépendances externes (fonts, check et initialisation serveur, etc...) ⤵

🔗 [Google Slide | SplashScreen](https://docs.google.com/presentation/d/1W0b7Na9pcBiR0KUDhLtvlV6x6oNgFo9X6l7KKpaYibU/edit#slide=id.gf85a3fda8d_1_44)

### 4.3 Navigation

Implémentez le type de navigation que vous préférez et qui (d'après-vous) correspond le mieux à ce projet ⤵

Pour rappel, la librairie est [React Native Navigation](https://reactnavigation.org/docs/getting-started/) et les 3 types de navigations sont :
- Stack *(à implémenter forcément)*
- Drawer
- Tabs

🔗 [Google Slide | Navigation](https://docs.google.com/presentation/d/1W0b7Na9pcBiR0KUDhLtvlV6x6oNgFo9X6l7KKpaYibU/edit#slide=id.gf2fc3af8dd_0_2)

### 4.4 Ecran de login

Si l'API n'est pas encore prête, implémentez un écran de login fictif avec les champs "username", "password" et un bouton "se connecter".

Le bouton "se connecter" ferait donc pour le moment une simple redirection vers l'écran d'accueil en attendant l'implémentation réelle du login/password *(quand l'API sera prête)*

Quelques liens utiles pour comprendre... :

- [Github | react-native-expo-auth](https://github.com/tatianagripasova/react-native-expo-auth)
- [Authentication in React Native, Easy, Secure, and Reusable solution.](https://www.obytes.com/blog/authentication-in-react-native-easy-secure-and-reusable-solution)
- [How To Add Authentication to Your React Native App](https://betterprogramming.pub/how-to-add-authentication-to-your-react-native-app-with-react-hooks-and-react-context-api-46f57aedbbd)
- [Github | mesan-react-native-authentication-app](https://github.com/MosesEsan/mesan-react-native-authentication-app/tree/auth)
- [React Native: Implementing Browser-Based Authentication using Expo’s AuthSession Component](https://levelup.gitconnected.com/react-native-implementing-browser-based-authentication-using-expos-authsession-component-ffee25b50ae8)
- [Build a great login experience with React Native, Axios and JSONWebToken](https://www.willandskill.se/en/build-a-great-login-experience-with-react-native/)
- [Adding Authentication to Your React Native App Using JSON Web Tokens](https://dzone.com/articles/adding-authentication-to-your-react-native-app-usi-1)

⚠️ Aucun de ces projets ci-dessus est considéré comme LA MARCHE à suivre, c'est simplement pour vous inspirer et comprendre l'implémentation de l'authentification en React Native.

### 4.5 UI Framework ? *(optionnel)*

Tous les développeurs n'ont pas la touche "design", c'est un fait. Et si vous utilisiez un framework UI qui vous facilitera la vie et rendra votre application un peu plus jolie ?

Je recommande les librairies de composants suivantes :

- [React Native Elements](https://reactnativeelements.com/)
- [Native Base](https://nativebase.io/)
- [Lottie](https://github.com/lottie-react-native/lottie-react-native)
- [UI Kitten](https://akveo.github.io/react-native-ui-kitten/)
- [Paper](https://reactnativepaper.com/)

N'hésitez pas à ajouter un de ceux-là (ou un autre) à votre projet et à en utiliser les composants.

_________________

N'oubliez pas de faire des commits réguliers à la fin de chaque séance pour éviter les conflits Git.
