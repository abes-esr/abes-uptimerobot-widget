# abes-uptimerobot-widget

Widget utilisé sur le site web Abes pour afficher dynamiquement l'état de la météo des services des l'Abes : [API](https://status.abes.fr) et [Applications](https://status-api.abes.fr).

Il repose sur l'API d'uptimerobot pour récupérer l'état UP/DOWN des applications et API proposées par l'Abes.

## Usage : intégration dans un site HTML

Intégrez le javascript sur votre votre page html :
```html
<script src="xxxxx/bundle.min.js" ></script>
```
Ensuite instanciez l'objet AbesUptimerobotWidget :
```html
<script>
  $auw = new AbesUptimerobotWidget({
    api_key: 'eee'
  });
  // TODO
</script>
```

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

# Builder et commiter le code pour la prod dans le répertoire `dist/`
npm run build-prod
git add dist/
git commit -m "build de prod" dist/

# On génère le tag git et on le push
git tag $VERSION
git push && git push --tags
```

Le code du widget à inclure sur votre site web est alors disponible ici : TODO