---
theme: développement
title: Base de données en graphe
rang: 3
---
### Base de données en graphe

La base de données en graphe maquisdoc est implémentée avec neo4j. Elle est constituée de *noeuds* et de *relations* entre ces noeuds.

Chaque noeud possède un unique *label* et plusieurs propriétés.  
Chaque relation possède 
  - un unique noeud de départ
  - un unique noeud d'arrivée
  - un unique nom
  - éventuellement plusieurs propriétés

Le type d'un noeud est caractérisé par son label, le type d'une relation est caractérisé par son nom. Attention, le *nom* d'une relation ne caractérise pas la relation elle même mais seulement son type.

Les deux tableaux suivants présentent les différents types de noeuds et de relations.

|Labels des noeuds | description | propriété caractéristique |
|----------------- | ------------| ------------------------- |
| `Concept`          | concept (dans le contexte d'une discipline) dont le type est caractérisé par la valeur de la propriété `typeConcept` | (`typeConcept`, `litteral`)
| `Document`         | document pédagogique dont le type est caractérisé par la valeur de la propriété `typeDoc` | (`typeDoc`, `titre`) |
| `Evenement`        | événement pédagogique dont le type est caractérisé par la valeur de la propriété `typeEvt` |   (`typeEvt`, `nom`)|
| `SiteWeb` | site scientifique  | (`typeSiteWeb`, `nom`) |

Dans la base, chaque noeud est caractérisé par un unique identifiant informatique qui n'a pas de valeur sémantique. La dernière colonne permet de caractériser sémantiquement un unique noeud. Par exemple, il existe un unique noeud labellisé `Concept` dont la valeur de `litteral` est "nombre de Stirling" son identifiant informtique est 187.  
Attention le `titre` d'un document désigne en fait plutôt le nom principal du fichier source que réellement le titre. Sa valeur sémantique est faible, c'est un point qu'il faudra améliorer à l'avenir.
<br/>

| Noms des relations | description/exemple |
|------------------- |---------------------|
| `APPARAIT_DANS` | un concept `APPARAIT_DANS` un autre concept |
| `CONTIENT` | un document `CONTIENT` un sous-document, un concept CONTIENT un sous-concept |
| `DOCUMENTE` | un document `DOCUMENTE` un concept |
| `EVALUE` | un événement ou certains documents (exercice, devoir) `EVALUE` un concept |
| `INDEXE` | un document `INDEXE` un concept lorsque le concept figure dans l'index du document|
| `INTERVIENT_DANS` | un concept `INTERVIENT_DANS` un document. Ce concept est une *clé* du document.|
| `OUTIL_DE` | un concept de type *résultat* est un `OUTIL_DE` un autre concept.|
| `PORTE_SUR` | un document `PORTE_SUR` un concept. |
| `REQUIERT` | un document ou un concept `REQUIERT` un autre concept pour être compris ou maitrisé |
| `REFERENCE` | un document `REFERENCE` un autre document au sens d'une référence bibliographique |
| `SPECIALISE` | un concept `SPECIALISE` un autre concept c'est à dire qu'il en est un cas particulier ou un exemple |
| `UTILISE` | un événement `UTILISE` un document comme support: un document de cours, un énoncé, ... |

*****
Le tableau suivant liste les propriétés des noeuds et, pour chaque, les types (labels) des noeuds qui peuvent avoir cette propriété.

|Propriété | Description | Labels |
|----------|------------ |--------|
|`annéeEvt` | année de l'évènement | `Evenement` |
|`date` | date de l'insertion du noeud | tous |
|`description`  | texte descriptif | tous |
|`discipline` | mathématiques, informatique, ... | tous |
|`litteral` | chaîne de caractère caractérisant le concept | `Concept` obligatoire |
|`nom` | nom de l'évènement | `Evenement`, `SiteWeb` obligatoire|
|`titre` | titre ou nom du document | `Document` obligatoire|
|`typeConcept` | type du concept | `Concept` obligatoire |
|`typeDoc` | type du document | `Document` obligatoire |
|`typeEvt` | obligatoire type de l'événement | `Evenement` |
|`typeSiteWeb` | type du site | SiteWeb obligatoire |
|`url` | url du document (pdf) | `Document` obligatoire |
|`urlCorr` | url du corrigé (pdf)| `Document` |
|`urlEnon` | url de l'énoncé (pdf) | `Document` |
|`urlSrc` | url de la source (lateX, ...) | `Document` |
|`urlSrcCorr` | url de la source du corrigé | `Document` |
|`urlSrcEnon` | url de la source de l'énoncé | `Document` |
|`urlSrcMaple` | url de la source Maple (héritée) | `Document` |

----

Les valeurs possibles des propriétés caractérisant les sous-types sont présentées ici

| Propriété | Valeurs       |
| --------- | ------------- |
|`typeConcept`| thème feuille exercices (à supprimer), index Latex (à supprimer), objet mathématique, résultat mathématique, association d'objets mathématiques, discipline |
|`typeDoc`  | cours, exercice, liste exercices, liste rapidexo, livre problèmes, problème, programme, sujet dossier ADS, livre, article scientifique|
`typeEvt` | question de cours , DM, DS, semaine de colle |

------

Le tableau suivant présente les combinaisons valides de labels de noeuds et de noms de relations.

| label début | nom relation | label fin |
| ----------- | ------------ | --------- |
| `Concept`   | `APPARAIT_DANS` | `Concept` |
| `Document`   | `CONTIENT` | `Document` |
| `Evenement`   | `CONTIENT` | `Evenement` |
| `Document` | `DOCUMENTE` | `Concept` |
| `Document` | `EVALUE` | `Concept` |
| `Evenement` | `EVALUE` | `Concept` |
| `Document` | `INDEXE` | `Concept` |
| `Concept` | `INTERVIENT_DANS` |`Document` |
| `Concept`   | `OUTIL_DE` | `Concept` |
| `Concept`   | `PORTE_SUR` | `Concept` |
| `Document` | `RÉFÉRENCE` | `Document` |
| `Concept`   | `REQUIERT` | `Concept` |
| `Concept`   | `SPECIALISE` | `Concept` |
| `Evenement` | `UTILISE` | `Document` |

Un concept peut apparaitre dans plusieurs autres. Par exemple, le concept *présentation axiomatique* `APPARAIT_DANS` *Polynômes* et *Axiomatique de R*.  
La relation `REQUIERT` est plus forte que `APPARAIT_DANS`. Un concept c0 requiert un concept c1 lorsque c0 `APPARAIT_DANS` c1 et qu'une bonne maitrise de c0 est nécessaire pour aborder c1.  Par exemple, la maitrise du concept *présentation axiomatique* n'est pas nécessaire pour aborder le concept *polynômes* en revanche le concept *Espaces vectoriels (dimension finie)* `REQUIERT` celui de *Espaces vectoriels (sans dimension)*.

Un concept peut apparaitre ou être requis par plusieurs concepts. Lorsqu'un concept n'a de sens que dans le contexte d'un autre concept, on dira qu'il le `SPECIALISE`. Un concept ne peut être le début qu'une seule relation `SPECIALISE`, de plus les deux doivent avoir la même valeur pour la propriété `typeConcept` (par exemple *objet mathématique*).

Le début d'une relation `PORTE_SUR` doit être un concept de type *résultat mathématique* et la fin doit être un concept de type *objet mathématique*.

Un concept de type *résultat mathématique* est un `OUTIL_DE` un autre *résultat mathématique* lorsque le premier intervient dans la démonstration du second.

Un noeud de label `Evenement` est inscrit dans le temps et représente un travail proposé aux étudiants. Par exemple, un `Evenement` dont la valeur de `typeEvt` est *DS* `UTILISE` un `Document` dont la valeur de `typeDoc` est *problème*. Une semaine de colle est aussi un `Evenement` qui `CONTIENT` des sous événements donts la valeur de `typeEvt` est *question* de cours. Il est aussi possible qu'un événement `EVALUE` un concept pour vérifier que ce concept est bien compris par les étudiants.

Un `Document` `INDEXE` un `Concept` lorsque ce dernier est écrit dans la source comme un index Latex. Cette relation est initiée seulement par l'auteur au moment du travail sur le fichier source, elle existe au niveau des fichiers et pas seulement au niveau de la base de données.  
La relation `Concept` `APPARAIT_DANS` `Document` a la même signification (en inversant début et fin) mais elle existe seulement au niveau de la base et non au niveau des fichiers.

----------------

#### Consistance

Les paragraphes précédents présentent des règles que doit valider la base en graphe pour être consistante. Elles sont rassemblées ici avec des requêtes cypher permetant de les vérifier. Elles sont utilisées dans les *tests de consistance* figurant dans les scripts de maintenance.

Cette dernière partie, en construction, présente des requêtes cypher testant la validité des règles dans la base réelle. Elles doivent renvoyer `VRAI` lorsque la règle est vérifiée.

*Le libellé d'un concept est un texte non vide*

    MATCH (c:Concept)
        WHERE c.litteral IS NULL OR c.litteral <> toStringOrNull(c.litteral)
    RETURN count(c) = 0 AS bool


*Un noeud document est caractérisé par son type et son titre*

    MATCH (n1:Document),(n2:Document)
        WHERE n1.typeDoc = n2.typeDoc AND n1.titre = n2.titre AND id(n1) < id(n2)
    RETURN count(*) = 0 AS bool

*Un noeud concept est caractérisé par son type et son libellé*

    MATCH (n1:Concept),(n2:Concept)
        WHERE n1.typeConcept = n2.typeConcept AND n1.litteral = n2.litteral AND id(n1) < id(n2)
    RETURN count(*) = 0  AS bool

*Un noeud événement est caractérisé par son type et son nom*

    MATCH (n1:Evenement),(n2:Evenement)
        WHERE n1.typeEvt = n2.typeEvt AND n1.nom = n2.nom AND id(n1) < id(n2)
    RETURN count(*) = 0  AS bool
    
------------------------
D'autres requêtes utiles.

Pour valider les triplets (label, nom de relation, label): liste des types possibles de relations.

    MATCH (d)-[r]->(f)
    RETURN DISTINCT labels(d) AS ld, type(r) AS nomR, labels(f) ORDER BY nomR, ld

Liste les labels de noeuds qui ont une description

    MATCH (n )
    WHERE exists(n.description)
    WITH labels(n) as listlab
    UNWIND listlab as label
    RETURN DISTINCT label

Liste des propriétés de noeuds qui ont des descriptions

    MATCH (n :Document)
    WHERE exists(n.description)
    WITH keys(n) as listprop
    UNWIND listprop as props
    RETURN DISTINCT props
    
Un noeud peut-il être orphelin, c'est à dire sans aucune relation avec un autre noeud? Ce n'est pas clair. La requête suivant fournit la liste des orphelins.

    MATCH (n)
    OPTIONAL MATCH (n)-[r]-(s)
    WITH n,r
    WHERE r IS NULL
    RETURN n

