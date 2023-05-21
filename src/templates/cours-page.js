import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import TitreVue from "../components/titrevue"

import IconeVueDePres from "/src/components/icones/iconevuedepres";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper"

const CoursPage = ({ data, pageContext}) => {
  const cours = pageContext.cours
  const concepts = cours.concepts
  //const index = cours.conceptsINDEXE

  const Menusource = () => {
    const [anchorElS, setAnchorElS] = React.useState(null);
    const openS = Boolean(anchorElS);
    const handleClickS = (event) => {
      setAnchorElS(event.currentTarget);
    };
    const handleCloseS = () => {
      setAnchorElS(null);
    };
    return (
      <Toolbar>
        Sources
        <IconButton
           size="medium"
           edge="end"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
           id="basic-buttonS"
           aria-controls={openS ? 'basic-menuS' : undefined}
           aria-haspopup="true"
           aria-expanded={openS ? 'true' : undefined}
           onClick={handleClickS}
        >
          <MenuIcon />
        </IconButton>
        <Menu
            id="basic-menuS"
            anchorEl={anchorElS}
            open={openS}
            onClose={handleCloseS}
            MenuListProps={{ 'aria-labelledby': 'basic-buttonS',}}
        >
          <MenuItem>                
            <a href={cours.urlSrc} 
               target="_blank"
                rel="noopener noreferrer"
            >
              Fichier LateX
            </a>
          </MenuItem>
        </Menu>
      </Toolbar>
    )
  };

  const Menuindexe = () => {
    const [anchorElI, setAnchorElI] = React.useState(null);
    const openI = Boolean(anchorElI);
    const handleClickI = (event) => {
      setAnchorElI(event.currentTarget);
    };
    const handleCloseI = () => {
      setAnchorElI(null);
    };
    return (
      <Toolbar>
         Concepts indexés
         <IconButton
            size="medium"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-buttonI"
            aria-controls={openI ? 'basic-menuI' : undefined}
            aria-haspopup="true"
            aria-expanded={openI ? 'true' : undefined}
            onClick={handleClickI}
        >
          <MenuIcon />
        </IconButton>
        <Menu
            id="basic-menuI"
            anchorEl={anchorElI}
            open={openI}
            onClose={handleCloseI}
            MenuListProps={{ 'aria-labelledby': 'basic-buttonI',}}
        >
          {concepts.map(({litteral,_id},index)=>(
            <MenuItem>
               <Typography variant="body2" mr={1}>
                  {litteral}
               </Typography>
               <Link
                  css={css`color: darkgreen;`}
                  to={"/concept_" + _id}
               >
                 <IconeVueDePres />
               </Link>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    )
  };

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
         Concepts documentés
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
          {concepts.map(({litteral,_id},index)=>(
            <MenuItem>
               <Typography variant="body2" mr={1}>
                  {litteral}
               </Typography>
               <Link
                  css={css`color: darkgreen;`}
                  to={"/concept_" + _id}
               >
                 <IconeVueDePres />
               </Link>
            </MenuItem>    
          ))}                
        </Menu>
      </Toolbar>
    )  
  };

  return (
    <Layout>
        <Container maxWidth="md" sx={{mt: 3, mb:3}}>
          <TitreVue nomnoeud={cours.titre}>
            Vue du document de cours 
          </TitreVue>
        </Container>
        <Container maxWidth="md" sx={{mt: 3, mb:3}}>
          <Paper sx={{mt: 3, mb:3, pt:1, pl:1}}>
            <object
                data={cours.url}
                type="application/pdf"
                width="99%"
                height="300px"
                css={css`border-style: none`}
            >
              le pdf manque ou le navigateur ne permet pas de l'afficher 
            </object>
          </Paper>
        </Container>
        <Container maxWidth="md" sx={{mt: 3, mb:3}}>
          <Grid container spacing={2} >
              <Grid xs={4}>
                <Menusource />
              </Grid>
              <Grid xs={4}>
                <Menuindexe />
              </Grid>
              <Grid xs={4}>
                <Menuconcept />
              </Grid>
          </Grid>
        </Container>
    </Layout>
  )
}

export default CoursPage
