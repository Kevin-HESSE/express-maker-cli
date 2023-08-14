# Express maker CLI

Merci de participer aux test du package `express maker CLI`. Pour vous aider, suivez les instructions du README pour installer ce dernier. 

Pour le test, aucune dépendance sera nécessaire.

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

## Avenir du projet

Je suis content du résultat. L'outil est suffisant puissant pour une utilisation personnelle et mettre en place un petit serveur express fonctionnelle mais peu efficace.

Le projet ne va pas trop évoluer dans les prochaines semaines car le cahier d'évolution est assez lourd :

- TypeScript
- Architecture du projet
- Test technique
- Une meilleure documentation

### TypeScript et Architecture du projet

Les deux sont liées !

Dans l'optique où, je souhaite ouvrir à la contribution, je veux m'assurer que l'environnement de développement soit cadré et cohérent.

- Certains éléments mis en place sont un peu brouillon (de mon point de vue).
- Il manque encore pas mal d'options possibles
  - Fichier de configuration
  - Possibilité d'ajout de typescript

Je vais profiter de ce mois de spécialisation pour réfléchir aux améliorations potentiels. Je veux en profiter pour renforcer mes connaissances acquises pour éviter trop de refactorisation par la suite.

Chaque amélioration viendra petit à petit. J'ai une bonne base sur laquelle je vais pouvoir travailler. Je ne vais pas repartir de zéro mais tout reprendre et remanier l'ensemble.

### Test technique

Pour assurer un maximum d'efficacité du programme, je dois m'assurer de son bon fonctionnement selon les versions de node. L'idée sera qu'elle soit efficace au minimum sur la version 14 voire 12 maximum.

### Une meilleure documentation

Je me suis rendu compte que certains outils ne donnent pas l'envie de les essayer / utiliser si leur documentation est obscure. Je vois large, en cours de réflexion :

- un site web dédié à mon programme
- différent readme en fonction des commandes

Mon programme impose une certaine logique quand il importe les documents. Mon but est de rendre le plus compréhensible et extensible les fonctionnalités. Les controllers par exemple fonctionnent sur le principe des classes. Chose peu commune dans le monde du JavaScript.

### Conclusion

Il y a encore beaucoup de boulot :smile: . Je vais prendre mon temps et le réussir jusqu'au bout et avec passion. Je veux être sur dans quel direction allait avant de le finaliser.
