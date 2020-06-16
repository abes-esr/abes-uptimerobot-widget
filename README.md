# abes-uptimerobot-widget

Widget utilisé sur le site web Abes pour afficher dynamiquement l'état de la météo des services des l'Abes : [API](https://status.abes.fr) et [Applications](https://status-api.abes.fr).

Il repose sur l'API d'uptimerobot pour récupérer l'état UP/DOWN des applications et API proposées par l'Abes.

## Usage : intégration dans un site HTML

Intégrez le javascript sur votre votre page html depuis les URL suivantes (adaptez XXXXXX par le numéro de version souhaité) :
```html
<script src="https://raw.githubusercontent.com/abes-esr/abes-uptimerobot-widget/XXXXXX/dist/bundle.min.js"></script>

```
Ou bien télécharger la version souhaitée depuis :
https://github.com/abes-esr/abes-uptimerobot-widget/releases

Ensuite instanciez l'objet AbesUptimerobotWidget dans votre page HTML, dont voici un exemple :
https://github.com/abes-esr/abes-uptimerobot-widget/blob/master/src/index.html

- onLOADING est appelée dès le début de l'appel à l'API uptimerobot (qui peut prendre quelques millisecondes). C'est l'occasion de positionner un indicateur visuel pour faire patienter l'utilisateur.
- onUP est appelée dès le retour de l'API uptimerobot si l'ensemble des "monitors" sont dans l'état UP. C'est l'occasion de positionner un soleil, un led vert, ou un coeur pour signaler la bonne nouvelle à l'utilisateur.
- onDOWN est appelée dès le retour de l'API uptimerobot si au moins un "monitor" est dans l'état DOWN. C'est l'occasion de signaler visuellement la mauvaise nouvelle à l'utilisateur.
- ignoreMonitors est facultative, elle est appelée pour ignorer si besoin des "monitor" dans la détection UP/DOWN. Dans le cas de l'Abes, cette fonction est utilisée pour filtrer les application support (internes à l'Abes) de la météo des application de l'Abes (publiquement exposée aux réseaux de l'Abes). 

## Développeur

### Environnement de développement

Pré-requis :
  - npm

Pour installer les dépendances nécessaires :
```
npm install
```

Pour lancer un serveur web visualisant votre index.html et qui recharge en temps réel (hotreload) les modifications réalisées dans src/ (js, css, html ...) tapez ceci :
```
npm run watch
```
Ouvrir alors le navigateur sur http://127.0.0.1:8080 pour visualiser et développer à travers la page index.html de test.

Pour auto-formater votre code avant de commiter, taper ceci :
```
npm run prettier
```

Pour tester le build du projet comme en prod, taper :
```
npm run build-prod
```
Le résultat du build sera présent dans le répertoire `dist/`

### Générer une nouvelle version du widget

```
# Générer un numéro de version (à la mode [semver](https://semver.org/)) :
VERSION=$(npm version patch) # si c'est pour un bug fix
VERSION=$(npm version minor) # si c'est pour une nouvelle fonctionnalité
VERSION=$(npm version major) # si la compatibilité ascendante est cassée
git commit -m "new version" package.json

# Builder et commiter le code pour la prod dans le répertoire `dist/`
npm run build-prod
git add dist/
git commit -m "build de prod" dist/

# On génère le tag git et on le push
git tag $VERSION
git push && git push --tags
```

Le code du widget à inclure sur votre site web est alors disponible ici (adaptez XXXXXX par le nouveau numéro de version généré) :
```html
<script src="https://raw.githubusercontent.com/abes-esr/abes-uptimerobot-widget/XXXXXX/dist/bundle.min.js"></script>
```