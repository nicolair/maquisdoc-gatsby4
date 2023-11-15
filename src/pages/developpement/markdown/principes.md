---
theme: développement
title: Principes
rang: 1
---
### Principes
Le projet maquisdoc est un ensemble structuré de documents pédagogiques et d'outils informatiques. Son objectif est de <center>

|sauvegarder | relier | diffuser | maintenir |
|------------|--------|----------|-----------|

</center>

#### Organisation-Implémentation

**Sauvegarder: Dépôts**  
En arrière plan, les documents sources (essentiellement LateX) sont rassemblés en *dépôts* implantés dans des répertoires de la machine de travail d'un auteur et  hébergés sur github. Le lien [Dépôts](/developpement/markdown/depots) du menu Projet présente l'organisation des dépôts actuels.

**Relier: Base de données en graphe**  
Le terme *maquisdoc* désigne une base de données pédagogiques en graphe qui référence les documents et les relations entre les documents.  
Le lien [Base de données en graphe](/developpement/markdown/basedatagraph) du menu Projet présente le schéma de la base c'est à dire les différents types de noeuds et de relations.  
Cette base est hébergée sur un serveur neo4j.

**Diffuser: Site web - vues**  
Quelques explications sur la notion de *vue* et l'utilisation du site maquisdoc sont détaillées dans le lien [Site web - vues](/developpement/markdown/site) du menu projet.  
Les images des documents compilés sont hébergés et diffusés en arrière plan par des serveurs web statiques.  
Le site maquisdoc lui même est écrit en javascript avec le framework Gatsby. 

**Maintenir: Scripts de maintenance**  
Le cycle de travail d'un auteur consiste à 
1. rédiger des *documents* avec les outils de son choix dans un *dépôt*.
2. maintenir la cohérence du *dépôt* modifié avec le reste de l'organisation.  
Par exemple, il faut compiler les sources modifiées et placer les nouvelles images dans les serveurs assignés. Il faut aussi à mettre à jour la base de données en graphe.  
Des scripts python automatisant ces tâches sont proposés. Ils sont présentés dans le lien [Scripts de maintenance](/developpement/markdown/maintenance) du menu Projet.

#### Glossaire
La liste suivante présente la signification dans le contexte du projet des principaux termes utilisés.

* **document**: un document pédagogique du projet.
* **dépôt**: un dispositif organisé de stockage d'un ensemble de *documents*.
* **auteur**: une personne qui rédige des *documents* dans le cadre du projet.
* **développeur**: une personne qui code l'infrastructure informatique du projet.
* **utilisateur**: une personne qui cherche des *documents* pour travailler avec.
* **rédaction**: création ou modification d'un *document* dans un *dépôt*.
* **publication**: processus qui permet à tout *utilisateur* d'accéder à un *document*.
* **contextualisation** : processus qui permet de relier les *documents* entre eux.
* **maintenance** : actions à exécuter après une modification d'un *dépôt* pour conserver la cohérence du projet.

#### Documentation externe

Des liens web vers les documentations des outils utilisés.

*   markdown : un langage de balise simple facile à lire permettant de rédiger [syntaxe](https://daringfireball.net/projects/markdown/syntax)
*   Gatsby : [un générateur de site statique](https://www.gatsbyjs.com/) basé sur React
*   GraphQL : [langage de requête pour API](https://graphql.org/)
*   Neo4j : [base de données en graphe](https://neo4j.com/)
*   React : [une bibliothèque javascript](https://fr.reactjs.org/) pour créer des interfaces utilisateurs
*   .jsx  : format définissant une extension syntaxique de javascript spécifique à React [introduction](https://fr.reactjs.org/docs/introducing-jsx.html)
*   pydoc : générateur de [documentation](https://docs.python.org/fr/3/library/pydoc.html) pour les scripts python
*   digitalocean : [hébergeur](https://www.digitalocean.com/) et plus ...


#### Licences
Le projet maquisdoc (documents et code de l'application) est mis à disposition selon les termes de la <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Licence Creative Commons Attribution 4.0 International</a>.

Toutes les sources (documents, outils d'organisation et de diffusion) doivent être accessibles et téléchargeables pour modification (licence CC).

Noter que cette licence permet une utilisation commerciale des ressources: en particulier pour l'enseignement dans un cadre professionel, en classe ou pour des activités de soutien.

Le projet ne s'intéresse pas à la gestion d'une classe ni à la monétisation des ressources. Pour autant, <em> de tels développements ne sont pas interdits dans le cadre des licences choisies. </em> 

<center><a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Licence Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a></center><br/>

