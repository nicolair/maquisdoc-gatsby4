---
theme: développement
title: Base de données en graphe
rang: 3
---
### Base de données en graphe

Les *concepts* ou les *événements* sont d'autres types de noeuds.  

Tous les labels numériques ont été remplacés par des chaînes de caractères. La base est sauvegardée comme v1-0.dump

Il existe aussi plusieurs types d'arêtes comme *DOCUMENTE* ou *REQUIERT*. Par exemple "un noeud document *DOCUMENTE* un noeud concept" ou "un concept *REQUIERT* un autre concept".
Le schéma de la base est précisé par les tableaux suivants.

Un seul label par noeud.


|Labels des noeuds | Description |
|-----             | -----       |
| `Concept`          | un concept dans le contexte d'une discipline |
| `Document`         | document pédagogique dont le type est caractérisé par la valeur de la propriété `typeDoc` |
| `Evenement`        | événement pédagogique dont le type est caractérisé par la valeur de la propriété `typeEvt` |
| `SiteWeb`          | sites scientifiques             |


Valeurs de `typeDoc` : cours, liste exercices, liste rapidexo, exercice, livre, livre problèmes, problème, programme, sujet dossier ADS, article scientifique.

Valeurs de `typeEvt` : question de cours , DM, DS

*****


Propriétés des noeuds avec les labels des noeuds qui *peuvent* avoir chaque propriété.  
</br>

|Propriété | Description | Labels |
|----------|------------ |--------|
|`annéeEvt` |  | `Evenement` |
|`date` | héritée, date de l'insertion du noeud | tous |
|`description`  | texte descriptif | tous |
|`discipline` | mathématiques, informatique, ... | tous |
|`ideltdoc` | héritée de maquisdoc | tous |
|`litteral` | chaîne de caractère désignant le concept | `Concept` |
|`nom` | obligatoire | `Evenement`, `SiteWeb` |
|`titre` | obligatoire | `Document` |
|`typeDoc` | type de document | `Document` |
|`typeEvt` | type d'événement | `Evenement` |
|`typeSiteWeb` | type de site | SiteWeb |
|`url` | url du document (pdf) | `Document` |
|`urlCorr` | url du corrigé (pdf)| `Document` |
|`urlEnon` | url de l'énoncé (pdf) | `Document` |
|`urlSrc` | url de la source (lateX, ...) | `Document` |
|`urlSrcCorr` | url de la source du corrigé | `Document` |
|`urlSrcEnon` | url de la source de l'énoncé | `Document` |
|`urlSrcMaple` | url dela source Maple (héritée) | `Document` |

----

Description des relations


| Relation | description/exemple |
|----------|-------------|
| APPARAIT_DANS | un concept APPARAIT_DANS un autre concept |
| CONTIENT | un document CONTIENT un sous-document, un concept CONTIENT un sous-concept |
| DOCUMENTE | un document DOCUMENTE un concept |
| INTERVIENT_DANS | un concept INTERVIENT_DANS un document. Ce concept est une *clé* du document.|
| REQUIERT | un document ou un concept REQUIERT un autre concept pour être compris oumaitrisé |
| REFERENCE | un document REFERENCE un autre document au sens d'une référence bibliographique |
| SPECIALISE | un concept SPECIALISE un autre concept c'est à dire qu'il en est un cas particulier ouun exemple |
| UTILISE | un événement UTILISE un document comme support: un document de cours, un énoncé, ... |
| EVALUE | un événement ou certains documents (exercice, devoir) EVALUE un concept |

Les tableaux suivant indiquent les labels que doivent avoir les noeuds reliés par une relation d'un certain type.

Si le label du premier noeud est `Document`: 

    MATCH (e:Document)-[r]->(n) RETURN DISTINCT type(r),labels(n)
 
|	`type(r)`	| `labels(n)` |
|-----------|----------|
| `DOCUMENTE` |	 `Concept` |
| `EVALUE` |	 `Concept` |
| `CONTIENT` |	 `Document` |
| `REFERENCE` |	 `Document` |

----

Si le label du premier noeud est `Concept`:

    MATCH (e:Concept)-[r]->(n) RETURN DISTINCT type(r),labels(n)
    
|	`type(r)`	| `labels(n)`|
|-----------|----------|
| `APPARAIT_DANS` |	 `Concept` |
| `SPECIALISE` |	 `Concept` |
| `CONTIENT` |	 `Concept` |
| `REQUIERT` |	 `Concept` |
| `INTERVIENT_DANS` |	 `Document` |

----

Si le label du premier noeud est `Evenement`:
    
    MATCH (e:Événement)-[r]->(n) RETURN DISTINCT type(r),labels(n)

|	`type(r)`	| `labels(n)` |
|-----------|----------|
| `EVALUE` | `Concept` |
| `UTILISE` | `Document` |
| `CONTIENT` | `Evenement` |


----------------

Des requêtes qui me semblent utiles dans ce contexte pour valider les couples (label, propriété)
    
    MATCH (n )
    WHERE exists(n.description)
    WITH labels(n) as listlab
    UNWIND listlab as label
    RETURN DISTINCT label
    
    
    MATCH (n :Document)
    WHERE exists(n.description)
    WITH keys(n) as listprop
    UNWIND listprop as props
    RETURN DISTINCT props

    
La vérification de la pertinence de la base avec ce schéma a conduit à des modifications. La première base cohérente avec ce schéma est sauvegardée en v1-1.dump

