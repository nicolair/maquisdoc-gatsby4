import React from "react"
import { navigate , Link} from "gatsby"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import LayoutVues from "../components/layoutvues"
import TitreVue from "../components/titrevue"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import IconeVueDePres from "/src/components/icones/iconevuedepres";
import IconeDownloadPdf from "/src/components/icones/iconedownloadpdf";

const SemainePage = ({ data, pageContext }) => {
  const { previous, next} = pageContext ; 
  const semaine = pageContext.semaine ;
  const concepts = semaine.concepts ;
  const q_cours = semaine.sousevenements ;
  const conceptsAvecListexos = concepts.filter(hasListExos)
  const conceptsAvecDoccours = concepts.filter(hasDocCours)
  
  //console.log( conceptsAvecDoccours );
  
  function hasListExos (liste) {
     return liste.listexos.length > 0; 
  }

  function hasDocCours (liste) {
     return liste.documents.length > 0; 
  }

  
  const Menuconcept = () => {
    const [anchorElC, setAnchorElC] = React.useState(null);
    const openC = Boolean(anchorElC);
    const handleClickC = (event) => {
      setAnchorElC(event.currentTarget);
    };
    const handleCloseC = () => {
      setAnchorElC(null);
    };

    return (
      <Toolbar>
        Concepts étudiés
        <IconButton
           size="medium"
           edge="end"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
           id="basic-buttonC"
           aria-controls={openC ? 'basic-menuC' : undefined}
           aria-haspopup="true"
           aria-expanded={openC ? 'true' : undefined}
           onClick={handleClickC}
        >
          <MenuIcon />
        </IconButton>
        <Menu
            id="basic-menuC"
            anchorEl={anchorElC}
            open={openC}
            onClose={handleCloseC}
            MenuListProps={{ 'aria-labelledby': 'basic-buttonC',}}
        >
          { concepts.map(({litteral, _id, documents, listexos}) => 
              <MenuItem> 
                {litteral}
                <Link 
                  css={css`color: darkgreen;`}
                  to= {"/concept_" + _id}
                >
                  <IconeVueDePres />
                </Link>
              </MenuItem>
          )}
        </Menu>
      </Toolbar>
    )
  }

  const Menufeuilleexos = () => {
    const [anchorElF, setAnchorElF] = React.useState(null);
    const openF = Boolean(anchorElF);
    const handleClickF = (event) => {
      setAnchorElF(event.currentTarget);
    };
    const handleCloseF = () => {
      setAnchorElF(null);
    };

    return (
      <Toolbar>
        Exercices
        <IconButton
           size="medium"
           edge="end"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
           id="basic-buttonF"
           aria-controls={openF ? 'basic-menuF' : undefined}
           aria-haspopup="true"
           aria-expanded={openF ? 'true' : undefined}
           onClick={handleClickF}
        >
          <MenuIcon />
        </IconButton>
        <Menu
            id="basic-menuF"
            anchorEl={anchorElF}
            open={openF}
            onClose={handleCloseF}
            MenuListProps={{ 'aria-labelledby': 'basic-buttonF',}}
        >
          {conceptsAvecListexos.map(({litteral, listexos})=>
             <MenuItem>
               {litteral} 
               <Link 
                  css={css`color: darkgreen;`}
                  to= {"/document_" + listexos[0]._id}
                >
                  <IconeVueDePres />
               </Link>
             </MenuItem>
          )}
        </Menu>
      </Toolbar>
    )
  }

  const Menuquestionscours = () => {
    const [anchorElQ, setAnchorElQ] = React.useState(null);
    const openQ = Boolean(anchorElQ);
    const handleClickQ = (event) => {
      setAnchorElQ(event.currentTarget);
    };
    const handleCloseQ = () => {
      setAnchorElQ(null);
    };

    return (
      <Toolbar>
        Questions de cours
        <IconButton
           size="medium"
           edge="end"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
           id="basic-buttonQ"
           aria-controls={openQ ? 'basic-menuQ' : undefined}
           aria-haspopup="true"
           aria-expanded={openQ ? 'true' : undefined}
           onClick={handleClickQ}
        >
          <MenuIcon />
        </IconButton>
        <Menu
            id="basic-menuC"
            anchorEl={anchorElQ}
            open={openQ}
            onClose={handleCloseQ}
            MenuListProps={{ 'aria-labelledby': 'basic-buttonQ',}}
        >
          {q_cours.map(({nom, concepts})=>
              <MenuItem> 
                {nom} 
                <Link 
                  css={css`color: darkgreen;`}
                  to= {"/concept_" + concepts[0]._id}
                >
                  <IconeVueDePres />
                </Link>
              </MenuItem>
          )}
        </Menu>
      </Toolbar>
    )
  }
  
  const Menudoccours = () => {
    const [anchorElD, setAnchorElD] = React.useState(null);
    const openD = Boolean(anchorElD);
    const handleClickD = (event) => {
      setAnchorElD(event.currentTarget);
    };
    const handleCloseD = () => {
      setAnchorElD(null);
    };

    return (
      <Toolbar>
        Documents de cours
        <IconButton
           size="medium"
           edge="end"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
           id="basic-buttonD"
           aria-controls={openD ? 'basic-menuD' : undefined}
           aria-haspopup="true"
           aria-expanded={openD ? 'true' : undefined}
           onClick={handleClickD}
        >
          <MenuIcon />
        </IconButton>
        <Menu
            id="basic-menuF"
            anchorEl={anchorElD}
            open={openD}
            onClose={handleCloseD}
            MenuListProps={{ 'aria-labelledby': 'basic-buttonD',}}
        >
          {conceptsAvecDoccours.map(({litteral, documents})=>
             <MenuItem>
               {litteral} 
               <Link 
                  css={css`color: darkgreen;`}
                  to= {"/document_" + documents[0]._id}
                >
                  <IconeVueDePres />
               </Link>
             </MenuItem>
          )}
        </Menu>
      </Toolbar>
    )
  }
  
  return (
    <Layout>
      <LayoutVues>
        <Container maxWidth="md" sx={{mt: 3, mb:3}}>
          <TitreVue
            nomnoeud={pageContext.nom}
            tooltiptitle="2019-2020"
          > 
            Une année en mpsi B :
          </TitreVue>
          <Grid container>
            <Grid xs={4}>
              <Button 
                onClick={()=>{navigate(previous.nom.replace('semaine ','/semaine_') )}} 
                variant="outlined" 
                sx={{ml: 3}}
                css={css`color: darkgreen;`}
                startIcon={<NavigateBeforeIcon />}
              >
                {previous.nom}
              </Button> 
            </Grid>
            <Grid xs={4}>
              <Stack direction="row" 
                     spacing={1}
                     alignItems="center"
              >
                <Typography variant="body1">
                  lien vers pdf 
                </Typography>
                <a
                    css={css`color: darkgreen;`}
                    href = {semaine.documents[0].url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                   <IconeDownloadPdf />
                </a>
              </Stack>
            </Grid>
            <Grid xs={4}>
              <Button 
                onClick={()=>{navigate(next.nom.replace('semaine ','/semaine_') )}} 
                variant="outlined" 
                sx={{ml: 3}}
                css={css`color: darkgreen;`}
                endIcon={<NavigateNextIcon />}
              >
                {next.nom}
              </Button> 
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md" sx={{mt: 3, mb:3}}>
          <Paper sx={{mt: 3, mb:3, pt:1, pl:1}}>
            <object
              data={semaine.documents[0].url}
              type="application/pdf"
              width="99%"
              height="300px"
              css={css`border-style: none`}
            >
              le navigateur ne permet pas d'afficher un pdf 
            </object>
          </Paper>
        </Container>
        <Container maxWidth="md" sx={{mt: 3, mb:3}}>
          <Grid container spacing={1} >
            <Grid xs={3}>
              <Menuconcept />
            </Grid>
            <Grid xs={3}>
              <Menuquestionscours />
            </Grid>
            <Grid xs={3}>
              <Menudoccours /> 
            </Grid>
            <Grid xs={3}>
              <Menufeuilleexos />
            </Grid>
          </Grid>
        </Container>
      </LayoutVues>
    </Layout>
  )
}

export default SemainePage


