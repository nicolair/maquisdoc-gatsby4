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
* mettre à jour la base de données.

Elle s'effectue à l'aide de scripts Python locaux rassemblés dans le dépot GitHub (repository) [mtn-dpt](https://github.com/nicolair/mtn_dpt).

La maintenance d'un dépôt est lançée par un script spécifique qui importe un module spécifique d'initialisation (représentant le *manifeste* du dépôt) ainsi que des modules communs. Cette organisation est détaillée à travers l'exemple du dépôts des problèmes.

#### Exemple avec *math-pbs*
La maintenance est lancée par la commande

    python3 maintenir_mathPbs

dans le dossier contenant le script.

Cette commande importe les modules `init_mathPbs` et `depot` puis instancie un objet `Depot`. D'autres modules sont importés lors de ce processus.

  
<div style="text-align: center;">
  Modules communs
</div>

| nom           | rôle             | importe |
| ------------- | ---------------- | --------- |
| `depot`       | module principal | `execlocal`, `espace` |
| `execlocal`   | définit la classe `Execlocal` | `scantex` |
| `scantex`     | outils d'analyse de fichiers .tex |     |
| `espace`      | definit la classe `Espace` |     |


   
<div style="text-align: center;">
  Modules spécifiques
</div>

| nom            | rôle                       |
| -------------- | -------------------------- |
| `init_mathPbs` | initialisation, manifeste |
| `exl_mathPbs`  | scripts de manipulation de fichiers locaux |

   
<div style="text-align: center;">
  Modules externes
</div>

| nom          | rôle  |
| -----------  | ----- |
| `os`         |       |
| `sys`        |       |
| `importlib`  | importation programatique |
| `subprocess` |       |
| `glob`       |       |
| `os.path`    |       |
| `boto3`      | API espace |
| `mimetypes`  |       |


Les modules définissent diverses classes; c'est l'instanciation de ces classes qui effectue les différents aspects de la maintenance.

<div style="text-align: center;">
  Classes
</div>

| nom         | module      | rôle |
| ----------- | ----------- | ----- |
| `Depot`     | `depot`     | instancie `Execlocal` |
| `Execlocal` | `execlocal` |     |
| `Espace`    | `espace`    | interface avec l'espace DO |



#### Organisation du code de maintenance
Tous les scripts et modules de maintenance sont
En plus des scripts et modules spécifiques, la maintenance utilise plusieurs modules et classes communs à tous les dépôts.


Pour le moment

| dépot | dossier du dépôt | nom du script | initialisation |
| ----- | ---------------- | -----------  | ---------------|
| exercices | math-exos | maintenir_mathExos | init_mathExos |
| problèmes | math-pbs | maintenir_mathPbs | init_mathPbs |

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

La documentation sur les scripts de maintenance est générée par pydoc.
