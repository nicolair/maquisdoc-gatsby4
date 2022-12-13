---
theme: développement
title: Maintenance
rang: 3
---
### Maintenance d'un dépôt

Chaque dépôt est une composante du projet maquisdoc. La maintenance assure la cohérence entre l'état local du dépôt dans lequel un auteur vient de travailler et les autres composantes du projet.

* Pousser les modifications locales vers le dépôt en ligne (un dépôt maquisdoc est un dépôt GitHub).
* Compiler localement les images qui doivent l'être.
* Pousser vers les espaces de diffusion les images nouvelles ou modifiées.
* Mettre à jour la base de données.

La maintenance s'effectue à l'aide de scripts Python locaux. 

Chaque dépôt de documents possède son propre script de maintenance. Ils sont rassemblés dans le dépot GitHub (repository) [mtn-dpt](https://github.com/nicolair/mtn_dpt). Pour le moment

| dépot | dossier du dépôt | nom du script | initialisation |
| ----- | ---------------- | -----------  | ---------------|
| exercices | math-exos | maintenir_mathExos | init_mathExos |
| problèmes | math-pbs | maintenir_mathPbs | init_mathPbs |

La documentation sur les scripts de maintenance est générée par pydoc. 

#### Organisation du code de maintenance
Plusieurs modules

| nom du module | rôle  |
| ------------- | ----- |
| `depot`       | module principal |
| `execlocal`   | contient la classe `Execlocal` |
| `scantex`     | outils d'analyse de fichiers .tex |
| `espace`     | interface avec un espace |

#### Exemple avec *math-pbs*
La maintenance est lancée avec la commande 
    `python3 maintenir_mathExos` 
dans le dossier contenant le script.


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

