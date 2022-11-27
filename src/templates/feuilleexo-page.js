import React, {useState} from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import LayoutVues from "../components/layoutvues"
import TitreVue from "../components/titrevue"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import Tooltip from '@mui/material/Tooltip';

import IconeVueDePres from "/src/components/icones/iconevuedepres";
import IconeDownloadPdf from "/src/components/icones/iconedownloadpdf";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const FeuilleExoPage = ({ data, pageContext}) => {
    const feuilleexo = pageContext.feuilleexo
    const conceptId = feuilleexo.conceptsEVAL[0]._id
    const docsvoisins = feuilleexo.conceptsEVAL[0].documentsvoisins
    const exosvoisins = docsvoisins.filter((value,index,arr)=>(
      value.docType === "exercice" && value.typeRel === "EVALUE"
    ))
    exosvoisins.sort((ob1,ob2) =>(
      ob2.docTitre < ob1.docTitre
    ))
    const nbexos = exosvoisins.length
    const [indexexoState,setindexexo] = useState(0)
    // console.log(exosvoisins[indexexoState].docUrl)
    const suiv = num => {
      setindexexo((num) => (num + 1) % nbexos)
    }
    const prec = num => {
      setindexexo((num) => (num + nbexos - 1) % nbexos)
    }
    
    return (
        <Layout>
          <LayoutVues>
            <Container maxWidth="md" sx={{mt: 3, mb:3}}>
              <TitreVue
                nomnoeud={feuilleexo.titre}> 
                Vue de la feuille d'exercices sur le thème :  
              </TitreVue>
              <Stack direction="row" 
                     spacing={1}
                     alignItems="center"
              >
                <Typography variant="body1">
                  lien vers pdf 
                </Typography>
                <a
                    css={css`color: darkgreen;`}
                    href = { feuilleexo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                   <IconeDownloadPdf />
                </a>
                <Typography sx={{pl:10}}>
                  concept associé au thème
                </Typography>
                <Link css={css`color: darkgreen;`}
                      to={"/concept_" + conceptId}
                >
                  <IconeVueDePres />
                </Link>
              </Stack>
              <Container maxWidth="md" sx={{mt: 3, mb:3}}>
                <Toolbar>
                    <Typography variant="body1" sx={{mr: 3}}>
                      {nbexos} exercices sur ce thème
                    </Typography>
                    <Typography>
                      Exercice courant 
                      <Tooltip title="nom du fichier de base">
                        <span> {exosvoisins[indexexoState].docTitre} </span>
                      </Tooltip>
                    </Typography>
                    <Link css={css`color: darkgreen;`}
                          to={"/document_" + exosvoisins[indexexoState].docId}
                    >
                      <IconeVueDePres />
                    </Link>
                    <Button onClick={prec} 
                            variant="outlined" 
                            sx={{ml: 3}}
                            css={css`color: darkgreen;`}
                            startIcon={<NavigateBeforeIcon />}
                    >
                      Précédent 
                    </Button> 
                    <Button onClick={suiv}
                            variant="outlined" 
                            sx={{ml: 3}}
                            css={css`color: darkgreen;`}
                            startIcon={<NavigateNextIcon />}
                    >
                      Suivant 
                    </Button> 
                </Toolbar>              
                <Paper elevation={2} sx={{mt: 1}}>
                  <iframe 
                    src={exosvoisins[indexexoState].docUrl} 
                    width='99%'      
                    style={{border:'none'}}
                    title='cadre-exo'>
                  </iframe>
                </Paper>
              </Container>
            </Container>
          </LayoutVues>
        </Layout>
    )
}

export default FeuilleExoPage
