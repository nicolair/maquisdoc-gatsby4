---
theme: "journal"
title: "Sauvegarde - Collaboration - Git"
date: "2023-01-17"
---

Les sources des composantes (interfaces, documents) sont placés dans des dépôts GitHub pour permettre leur sauvegarde et la collaboration entre les auteurs ou les développeurs.

|Lien                                                                           | Rôle                            | Branche principale |
| ----------------------------------------------------------------------------  | -----------------------------   | ------------------ |
|[maquisdoc-gatsby4](https://github.com/nicolair/maquisdoc-gatsby4)             | site maquisdoc                  | `main`   |
|[maquisdoc-neo4j-graphql](https://github.com/nicolair/maquisdoc-neo4j-graphql) | serveur graphql interface neo4j | `main`   |
|[maquisdoc-rapidexo](https://github.com/nicolair/maquisdoc-rapidexo)           | interface rapidexo              | `main`   |
|                                                                               |                                 |          |
| [mtn-dpt](https://github.com/nicolair/mtn_dpt)                                | maintenance des dépôts          | `master` |
| [math-exos](https://github.com/nicolair/math-exos)                            | dépôt source exercices          | `master` |
| [math-pbs](https://github.com/nicolair/math-pbs)                              | dépôt source problèmes          | `master` |
| [math-cours](https://github.com/nicolair/math-cours)                          | dépôt source cours              | `master` |
| [math-rapidexos](https://github.com/nicolair/math-rapidexos)                  | dépôt source rapidexo           | `master` |


Je suis le seul contributeur mais la possibilité qu'il en existe plusieurs est simulée par le fait que j'utilise deux machines de travail distinctes suivant l'endroit ou je réside.
En plus de la branche principale (production), j'utilise des branches locales (développement) `olmeto` ou `plessis` suivant la machine de travail.

Cela correspond à deux contributeurs échangeant via des [branches distantes](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches) sur GitHub.

Cela ne semble pas utile. Ce qui est important c'est que je pousse toujours mon travail sur GitGub avant de me déplacer. Ce qui serait utile c'est avoir un outil de maintenance qui exécute des `git status` sur tous les dépôts.

