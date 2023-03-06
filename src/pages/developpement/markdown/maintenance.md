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

La [documentation](https://nicolair.github.io/mtn_dpt/maintenance.html) détaillée des scripts de maintenance est générée par [pdoc](https://pdoc.dev/docs/pdoc.html) et diffusée comme des [pages](https://docs.github.com/en/pages) GitHub.

Dans le dossier de maintenance local, la gestion des dépendances et de l'environnement virtuel est assuré par [poetry](https://python-poetry.org/docs/). la commande qui lance la création de la documentation est

    poetry run pdoc ../maintenance.py -o ./docs

La documentation est constituée de fichiers html dans le sous-dossier `.docs`. Lorsqu'ils sont poussés vers le dépôt sur GitHub, les pages de documentation sont automatiquement mises à jour.
