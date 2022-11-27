import React from "react"
import { css } from "@emotion/react"
import { useStaticQuery, Link, graphql } from "gatsby"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { rhythm } from "../utils/typography";
import IconeVueDeLoin from "./icones/iconevuedeloin";

export default function LayoutVues({ children }) {
    const data = useStaticQuery(
    graphql`
      query {
        allMenuVuesCsv {
          edges {
            node {
              code
              page
              texte
            }
          }
        }
      }`
    );
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <div css={css`margin-top: ${rhythm(1)}`}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='transparent'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
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
            <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
              Vues
            </Typography>
            <IconeVueDeLoin/> 
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
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
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      {children} 
    </div>
  );
}

