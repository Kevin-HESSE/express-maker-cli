# Express maker CLI

Merci de participer aux test du package `Express maker CLI`. Pour vous aider, suivez les instructions du README pour installer ce dernier. Si vous rencontrez un soucis, merci de me fournir un screenshot et le processus pour refaire le bug via les issues de ce répo GitHub.

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

### Génération d'un modèle

Pour lancer la procédure de génération de model :

```bash
# Replace nameModel by something else
express-maker model nameModel
```

`nameModel` sera le nom donnée de votre fichier et de votre classe à la fin du processus.

Une série de question vont vous être posé qui permettront la création du modèle.

Actuellement le répertoire où ces derniers sont créées est le `./app/models`