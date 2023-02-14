# Express maker CLI

Merci de participer aux test du package `express maker CLI`. Pour vous aider, suivez les instructions du README pour installer ce dernier. 

Pour le test, aucune dépendance sera nécessaire.

La partie opérationnelle d'`express maker CLI`  s'inspire de :

- `sequelize CLI`
- `symfony/maker-bundle`, un package qui permet la création de controller et d'entité sur le framework Symfony

Le processus de création de modèle a été poussé plus loin avec une serie de question, qui permette une génération dynamique selon les besoins de l'utilisateur.

## FeedBack

Merci d'utiliser les issues du repos github dans les cas suivant :

- Si vous rencontrez un soucis, merci de me fournir un screenshot et la démarche pour reproduire le bug.
- Si vous voulez proposer une amélioration concernant les fonctionnalités déjà présentes

## Installation du package

Pour pouvoir utiliser ce package dans un autre projet, vous devez exécuter deux commandes bien distinctes.

Dans un premier temps, on va dire à NPM de considérer ce package `Express maker cli` comme une dépendance. Ainsi ce dernier pourra être installé dans n'importe quel projet. 

Taper la commande suivante dans le répertoire du package :

```bash
npm link
```

Ensuite pour l'installer comme dépendance d'un projet, rendez-vous dans le répertoire de votre projet puis tapez dans votre terminal :

```bash
npm link express-maker-cli
```

## Utilisation du package

`Express maker cli` s'exécute entièrement dans le terminal. Il faut taper la commande suivante :

```bash
express-maker 
```

### Aide

Pour afficher l'aide du programme :

```bash
express-maker -h
```

### Instanciation d'une application express

Avant de commencer, vous devez préparer votre environnement de travail :

```bash
express-maker init
```

Cette commande va créer les dossiers et fichiers nécessaires pour une application Express simple. **Attention** les paquets ne seront pas installés. Il vous donnera la commande en fonction de vos besoins.

### Génération d'un modèle

Pour lancer la procédure de génération de model :

```bash
express-maker model <nameModel>
```

`<nameModel>` sera le nom donnée de votre fichier et de votre classe à la fin du processus.

Une série de question vont vous être posé qui permettront la création du modèle.

Actuellement le répertoire où ces derniers sont créées est le `./app/models`

## Améliorations prévus

### Court terme

- Génération automatique du fichier pour se connecter à `sequelize`.

### Moyen / long terme

- Génération des routers / controllers