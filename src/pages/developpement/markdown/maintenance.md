---
theme: développement
title: Maintenance
rang: 3
---
### Maintenance d'un dépôt

Chaque dépôt est une composante du projet maquisdoc. La maintenance assure la cohérence entre l'état local du dépôt dans lequel un auteur vient de travailler et les autres composantes du projet.

Le rôle de la maintenance est de :

* pousser les modifications locales vers le dépôt en ligne (un dépôt maquisdoc est un dépôt GitHub).
* compiler localement les images qui doivent l'être.
* pousser vers les espaces de diffusion les images nouvelles ou modifiées.
* mettre à jour la base de données en graphe.

Elle s'effectue à l'aide de scripts Python locaux rassemblés dans le dépot GitHub (repository) [mtn-dpt](https://github.com/nicolair/mtn_dpt).

La maintenance d'un dépôt est lançée par un script spécifique qui importe un module spécifique d'initialisation (représentant le *manifeste* du dépôt) ainsi que des modules communs. Les différents types de modules et les classes définies sont précisés dans le paragraphe suivant. La maintenance du dépôt des problèmes est détaillée.

#### 1. Modules et classes
Les modules importés lors d'une maintenance sont de différents types.
  
<div style="text-align: center;">
  Modules communs
</div>

| nom           | rôle             | importe |
| ------------- | ---------------- | --------- |
| `depot`       | module principal | `execlocal`, `espace` |
| `execlocal`   | définit la classe `Execlocal` | `scantex` |
| `scantex`     | outils d'analyse de fichiers .tex |     |
| `espace`      | definit la classe `Espace` |     |


   
<div style="text-align: center; margin-top: 5px;">
  Modules spécifiques
</div>

| nom            | rôle                       |
| -------------- | -------------------------- |
| `init_mathPbs` | initialisation, manifeste |
| `exl_mathPbs`  | scripts de manipulation de fichiers locaux |
| `init_mathExos` | initialisation, manifeste |
| `exl_mathExos` | scripts de manipulation de fichiers locaux |

   
<div style="text-align: center; margin-top: 5px;">
  Modules externes
</div>

| nom          | rôle  |
| -----------  | ----- |
| `os`         | [Operating system interface](https://docs.python.org/3.11/library/os.html#module-os) |
| `sys`        | [System-specific parameters and functions](https://docs.python.org/3.11/library/sys.html?highlight=sys#module-sys) |
| `importlib`  | [The implementation of import](https://docs.python.org/3.11/library/importlib.html?highlight=importlib#module-importlib) |
| `subprocess` | [Subprocess management](https://docs.python.org/3.11/library/subprocess.html?highlight=subprocess#module-subprocess) |
| `glob`       | [Unix style pathname pattern expansion](https://docs.python.org/3.11/library/glob.html)|
| `os.path`    | [Common pathname manipulations](https://docs.python.org/3.11/library/os.path.html) |
| `boto3`      | API espace |
| `mimetypes`  | [Map filenames to MIME types](https://docs.python.org/3.11/library/mimetypes.html?highlight=mimetypes#module-mimetypes) |


Les modules définissent diverses classes. Ce sont les instanciations de ces classes qui effectuent les différentes tâches de la maintenance.

<div style="text-align: center;">
  Classes
</div>

| nom         | module      | rôle |
| ----------- | ----------- | ----- |
| `Depot`     | `depot`     | instancie `Execlocal` |
| `Execlocal` | `execlocal` |     |
| `Espace`    | `espace`    | interface avec l'espace DO |

#### 2. Exemple avec *math-pbs*
La maintenance est lancée par la commande

    python3 maintenir_mathPbs

dans le dossier contenant le script.

Ce script importe les modules `init_mathPbs` et `depot` puis instancie un objet `Depot`.  
Le module `depot` importe les modules `execlocal` et `espace`.  
L'initialisation de l'instance de `Depot` instancie
- un objet `Execlocal`
- un objet `Espace`

La mise à jour d'un espace associé à un dépôt se fait lors de l'instanciation de l'objet `Espace`. Le module `boto3` fournit un client Python pour l'API de l'espace.
Les credentials d'accès à un espace sont des clés générées à partir de l'interface Digital Ocean. Ces clés sont stockées localement sur la machine du dépôt dans le fichier `~/.aws/credentials` auquel accède silencieusement le client `boto3`.


#### 3. Organisation du code de maintenance
Les scripts et modules de maintenance ne sont pas encore eimplémentés pour tous les dépôts. Le tableau suivant présente les développements actuels.

| dépot | dossier du dépôt | nom du script | initialisation |
| ----- | ---------------- | -----------  | ---------------|
| exercices | math-exos | maintenir_mathExos | init_mathExos |
| problèmes | math-pbs | maintenir_mathPbs | init_mathPbs |


#### 4. Documentation

La documentation sur les scripts de maintenance est générée par pydoc.

- liste des sources à documenter:
    1. maintenance.py
    2. depot.py
    3. execlocal.py
    4. scantex.py
    5. espace.py
- pour chaque nom dans la liste des sources, 
    pydoc -w nom génère la page html de documentation pour le nom. Cette page comprend des liens vers d'autres pages de documentation.

Des **conventions de nommage** sont fixées pour divers types de fichiers. Elles sont repèrées par des expressions régulières auxquelles sont associées des scripts de maintenance.  
La maintenance consiste donc à scanner les fichiers et exécuter les scripts pour ceux qui vérifient les expressiosn régulières. 

