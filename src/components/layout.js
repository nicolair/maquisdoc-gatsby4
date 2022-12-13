import React from "react";
import { css } from "@emotion/react";
import { useStaticQuery, Link, graphql } from "gatsby";

import {Box, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import { rhythm } from "../utils/typography"
import Footer from "./footer"

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title,
            math_exos {
                url_diff
            }
          }
        }
        allMenuVuesCsv {
          edges {
            node {
              code
              page
              texte
            }
          }
        }
        allMarkdownRemark(
          filter: {frontmatter: {theme: {eq: "développement"}}},
          sort: {fields: frontmatter___rang, order: ASC}){
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )
  
  const MenuVues = () => {
    const [anchorElV, setAnchorElV] = React.useState(null);
    const openV = Boolean(anchorElV);
    const handleClickV = (event) => {
      setAnchorElV(event.currentTarget);
    };
    const handleCloseV = () => {
      setAnchorElV(null);
    };
    return (
      <Toolbar>
       <Typography 
         variant="h5" 
         component="h2"
         css={css`color: darkgreen;
                  display: inline-block;
                  margin: 0 auto;
              `}
       >
         Vues
      </Typography>
        <IconButton
           size="medium"
           edge="end"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
           id="basic-buttonV"
           aria-controls={openV ? 'basic-menuV' : undefined}
           aria-haspopup="true"
           aria-expanded={openV ? 'true' : undefined}
           onClick={handleClickV}
        >       
          <MenuIcon />
        </IconButton>
        <Menu
            id="basic-menuV"
            anchorEl={anchorElV}
            open={openV}
            onClose={handleCloseV}
            MenuListProps={{ 'aria-labelledby': 'basic-buttonV',}}
        >
          {data.allMenuVuesCsv.edges.map( ({node}) => (
            <MenuItem>
              <Link
                css={css`
                       color: darkgreen;
                       text-decoration: none;
                     `}
                to={node.page}
              >
                <Typography component="h4" variant="h7">
                  {node.texte}
                </Typography>
              </Link>
            </MenuItem>))            
          }
        </Menu>
      </Toolbar>
    )
  };
  
  const MenuDev = () => {
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
       <Typography 
         variant="h5" 
         component="h2"
         css={css`color: darkgreen;
                  display: inline-block;
                  margin: 0 auto;
              `}
       >
         Projet
       </Typography>
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
            id="basic-menuD"
            anchorEl={anchorElD}
            open={openD}
            onClose={handleCloseD}
            MenuListProps={{ 'aria-labelledby': 'basic-buttonD',}}
        >
          {data.allMarkdownRemark.edges.map( ({node}) => (
            <MenuItem>
                  <Link
                    css={css`
                      color: darkgreen;
                      text-decoration: none;
                      `}
                    to={node.fields.slug}
                  >
                    <Typography component="h4" variant="h7">
                      {node.frontmatter.title}
                    </Typography>
                  </Link>
            </MenuItem>
          ))}
          <MenuItem>
            <Link
                    css={css`
                      color: darkgreen;
                      text-decoration: none;
                      `}
                    to={"/developpement/journal"}
            >
              <Typography component="h4" variant="h7">
                Journal
              </Typography>
            </Link>
          </MenuItem>
        </Menu>
     </Toolbar>
    )
  };
  
  return (
    <div>
      <Box
        flexGrow={'1'}
        backgroundColor={'#CADFC8'}
        width={'100%'}
        paddingX={{ xs: 2, sm: 5, lg: 4 }}
      >
        <Grid container spacing={1}>
            <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                  <Link to={`/`}>
                    <Typography variant="h3" component="h1"
                      css={css`
                         margin-top: ${rhythm(1)};
                         display: inline-block;
                         font-style: normal;
                         color: darkgreen;
                        `}
                    >
                      {data.site.siteMetadata.title}
                    </Typography>
                  </Link>
            </Grid>
        </Grid>
      </Box>
      <Grid container spacing={1}>
         <Grid xs={4}>
              <MenuVues/>
         </Grid>
         <Grid xs={8}>
              <MenuDev/>
         </Grid>
      </Grid>
      <Divider />
      {children}
      <Footer/>
    </div>
  )
}

