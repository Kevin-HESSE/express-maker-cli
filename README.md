# Express maker CLI

Merci de participer aux test du package `express maker CLI`. Pour vous aider, suivez les instructions du README pour installer ce dernier. 

La partie opérationnelle d'`express maker CLI`  s'inspire de :

- `sequelize CLI`
- `symfony/maker-bundle`, un package qui permet la création de controller et d'entité sur le framework Symfony

## FeedBack

Merci d'utiliser les issues du repos github dans les cas suivant :

- Si vous rencontrez un soucis, merci de me fournir un screenshot et la démarche pour reproduire le bug.
- Si vous voulez proposer une amélioration concernant les fonctionnalités déjà présentes

## Installation du package

Pour pouvoir utiliser ce package dans un autre projet, vous devez exécuter deux commandes bien distinctes.

Dans un premier temps, on va dire à NPM de considérer ce package `Express maker cli` comme une dépendance. Ainsi ce dernier pourra être installé dans n'importe quel projet. 

Taper les commandes suivantes dans le répertoire du package :

```bash
npm install 
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
