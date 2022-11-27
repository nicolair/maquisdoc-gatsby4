import React from "react";
//import { Link } from "gatsby"
import { css } from "@emotion/react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import LayoutVues from "../components/layoutvues";
import TitreVue from "../components/titrevue"
import IconeVueDePres from "/src/components/icones/iconevuedepres";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Unstable_Grid2';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ExercicePage = ({ data, pageContext}) => {
  const exo = pageContext.exo
  //console.log(exo)
  
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
            <a href={exo.urlSrcEnon} 
               target="_blank"
                rel="noopener noreferrer"
            >
              énoncé
            </a>
          </MenuItem>
          <MenuItem>
            {exo.urlSrcCorr ?
                  <a href={exo.urlSrcCorr} 
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                    corrigé
                  </a>:
                  ""
            }
            </MenuItem>
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
         Concepts évalués
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
            {exo.conceptsEVAL.map(({litteral,_id},index)=>(
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
  
  const Menucontenant = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
              <Toolbar>
                Documents contenant cet exercice
                <IconButton
                  size="medium"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ 'aria-labelledby': 'basic-button',}}
                >
                  {exo.contenants.map(({titre,typeDoc,_id},index)=>(
                    <MenuItem>
                      <Typography variant="body2" mr={1}>
                        <small>({typeDoc})</small> {titre}
                      </Typography>
                      <Link
                          css={css`color: darkgreen;`}
                          to={"/document_" + _id}
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
      <LayoutVues>
        <Container maxWidth="md" sx={{mt: 3, mb:3}}>
          <TitreVue 
            nomnoeud={exo.titre}
            tooltiptitle="nom du fichier de base"
          >
            Vue de l'exercice 
          </TitreVue>
          <Container maxWidth="md" sx={{mt: 3, mb:3}}>
            <Paper elevation={2} sx={{mt: 1}}>
              <iframe 
                src={exo.url} 
                width='99%'
                style={{border:'none'}}              
                title='cadre-exo'>
              </iframe>
            </Paper>
          </Container>
          <Grid container spacing={2} >
            <Grid xs={4}>
              <Menusource />
            </Grid>
            <Grid xs={4}>
              <Menuconcept />
            </Grid>
            <Grid xs={4}>
              <Menucontenant />
            </Grid>
          </Grid>
        </Container>
      </LayoutVues>
    </Layout>
  )
}

export default ExercicePage
