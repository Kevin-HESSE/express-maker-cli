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

### Instanciation de sequelize

Pour générer le fichier permettant de créer une instance sequelize :

```bash
express-maker sequelize:connect
```

Cette commande va créer un répertoire `service` dans le dossier de l'application et un fichier `dbConnectService.js` à l'intérieur. Ce fichier est important car il sert également d'import dans les models générés par `express-maker`. Il rajoute également une ligne dans les fichiers `.env` et `.env.example` à modifier permettant de se connecter à la base de donée.

### Génération d'un modèle sequelize

Pour lancer la procédure de génération de model :

```bash
express-maker sequelize:model <nameModel>
```

`<nameModel>` sera le nom donnée de votre fichier et de votre classe à la fin du processus.

Une série de question vont vous être posé qui permettront la création du modèle.

Actuellement le répertoire où ces derniers sont créées est le `./app/models`

### Génération d'un outil de CRUD (Router et/ou Controller)

Pour générer un crud Router / Controller :

```bash
express-maker sequelize:crud 
```

Il va chercher dans le dossier `src/models` ou `app/models`, les models existants. Puis selon votre choix, il va générer le router et le controller associé à ce dernier.

**Attention : les controllers sont basés sur des classes.**

Cette commande vient avec deux options facultatives.

```bash
express-maker sequelize:crud -r #Crée uniquement le router
express-maker sequelize:crud -c #Crée uniquement le controller
```

- Contenu additionnel :
Quand un router est crée, un middleware `ParamRouterMiddleware` est automatiquement crée. Il s'agit d'une classe avec une methode qui permet de faire la requete dans la base de donnée à l'aide de sequelize. Il stocke le résultat dans une propriété de l'objet `request` d'express.

| Model | Paramètre de route | Objet instancié |
| ---- | ---- | ---- |
| Card | cardId | request.card |
| Tag | tagId | request.tag |
| ... | ... | ...|

Lors de la création d'un controller, une classe est importée par défaut : `CommonController` avec des méthodes prédéfinis.

| Méthodes | Fonctionnalités | Particularités | Format de retour |
| ---- | ---- | ---- | ---- |
| getAll | Récupére tous les éléments d'une table |  | JSON |
| getOne | Renvoie l'élèment trouvé | L'élément renvoyé est récupéré par le middleware du router | JSON |
| createOne | Créer un élément dans la base de données | Aucune vérfication est effectué | JSON |
| updateOne | Met à jour un élément dans la base de données | Aucune vérfication est effectué | JSON |
| deleteOne | Supprime un élément dans la base de données | L'élément suuprimé est récupéré par le middleware du router | JSON |

Ces méthodes sont importés dans le controller crée par la commande. Elles peuvent être surchargées en utilisant les mêmes méthodes. Cependant attention, si vous souhaitez utiliser le mot clé `this`, reprenez la même syntaxe d'écriture pour créer les méthodes.

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
  - Autre librairie de bdd (ex: mongo)

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
