import React from "react"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import TitreVue from "../components/titrevue"

import Container from "@mui/material/Container"
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ProblemePage = ({ data, pageContext}) => {
  const probleme = pageContext.probleme
  const utilisations = probleme.evenements
    
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
            <a href={probleme.urlSrcEnon} 
               target="_blank"
                rel="noopener noreferrer"
            >
              énoncé
            </a>
          </MenuItem>
          <MenuItem>
            {probleme.urlSrcCorr ?
                  <a href={probleme.urlSrcCorr} 
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

  const Menuutilisation = () => {
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
        Utilisations
        <IconButton
           size="medium"
           edge="end"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
           id="basic-buttonU"
           aria-controls={open ? 'basic-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
            id="basic-menuU"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-buttonU',}}
        >
          {utilisations.map(({nom})=> <MenuItem> {nom} </MenuItem>)}
        </Menu>
      </Toolbar>
    )
  };
  
  return (
      <Layout>
          <Container maxWidth="md" sx={{mt: 3, mb:3}}>
            <TitreVue 
              nomnoeud={probleme.titre} 
              tooltiptitle="nom du fichier principal"
            >
              Vue du problème
            </TitreVue>
            <Typography variant="body1">
              {probleme.description}
            </Typography>
          </Container>
          <Container maxWidth="md" sx={{mt: 3, mb:3}}>
            <Paper sx={{mt: 3, mb:3, pt:1, pl:1}}>
              <object
                data={probleme.url}
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
              <Grid xs={6}>
                <Menusource />
              </Grid>
              <Grid xs={6}>
                <Menuutilisation />
              </Grid>
            </Grid>
          </Container>
      </Layout>
    )
}

export default ProblemePage
