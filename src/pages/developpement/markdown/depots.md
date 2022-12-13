---
theme: développement
title: Dépôts
rang: 2
---
### Dépôts

Un *dépôt*, est un dispositif organisé permettant de stocker les sources de documents pédagogiques d'un même type et d'un même *auteur*. 

Le travail de rédaction se passe dans un dépôt. Chaque *auteur* est libre de l'organiser c'est à dire de choisir les formats, les conventions de nommage, le mode de stockage, ...

Pour mes dépôts, les sources sont en Latex, Asymptote ou Python et les fichiers sont écrits dans un dossier local sur mon ordinateur personnel. Pour faciliter le partage et assurer la sauvegarde, ce dossier local est aussi un dépôt Git. 

#### Liste des dépôts existants:
* [exercices](https://github.com/nicolair/math-exos)
* [problèmes](https://github.com/nicolair/math-pbs)
* [cours](https://github.com/nicolair/math-cours)
* [informatique pour tous](https://github.com/nicolair/IPT2)
* [rapidexo](https://github.com/nicolair/maquisdoc-rapidexo) 


On peut imaginer d'autres formats (libre office ou autre) et d'autres mode de stockage (headless cms).

Les dépôts font parties du projet maquisdoc. Les documents (sources et images) sont référencés et reliés à d'autres noeuds dans la base de données en graphe puis diffusés à travers le site [maquisdoc.net](https://maquisdoc.net). Les images (pdf, html, ...) sont placées dans des `espaces` (Digital Ocean) afin de permettre le téléchargement. 

Après avoir travaillé avec ses documents, un auteur doit maintenir la cohérence entre l'état du dépôt et son reflet dans le projet. Cette étape est la `maintenance` du dépôt.

La `maintenance` est réalisée par des scripts Python exécutés sur la machine hébergeant le dépôt. Ils constituent en eux mêmes un dépôt Git ([mtn_dpt](https://github.com/nicolair/mtn_dpt)) faisant partie du projet.

L'organisation d'un dépôt est indispensable à sa maintenance. Elle est décrite par un `manifeste`. 

À long terme, le manifeste d'un dépôt sera un texte formaté (md, YAML,json ?) décrivant la structure du dépôt. Je suis bien loin de savoir le faire.

Pour le moment, un dépôt est décrit dans le fichier Python d'initialisation de son script de maintenance.
