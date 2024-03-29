import React from 'react'
import { css } from "@emotion/react"
//import { makeStyles } from '@material-ui/next/styles'
//import Paper from '@material-ui/core/Paper'
//import Grid from "@material-ui/next/Grid"
import {Grid, Divider, Box} from "@mui/material"
//import Divider from '@material-ui/next/Divider'
//import List from '@material-ui/core/List'
//import ListItem from '@material-ui/core/ListItem'
//import Box from '@material-ui/core/Box'
//import Typography from '@material-ui/core/Typography'
//import { typography } from "../utils/typography"
//import { Typography } from typography
import Typography from "typography"

import { useStaticQuery, graphql } from 'gatsby'

//const useStyles = makeStyles((theme) => ({
//  root: {
//    flexGrow: 1,
//    backgroundColor: '#CADFC8',
//  },
//  sitemap: {
//    marginBottom: theme.spacing(2),
//    fontSize: "15px",
//  },
//  navtitle: {
//    fontWeight: 700,
//  },
//  copyright: {
//    marginTop: theme.spacing(2)
//  }
//}));

//function ListItemLink(props) {
//  return <ListItem button component="a" {...props} />;
//}

//function ListTitleLink(props) {
//  const classes = useStyles();
//
//  return <ListItemLink className={classes.navtitle} {...props} />;
//}

export default function Footer() {
  //const classes = useStyles();
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
      }
    `
  )

  return (
    <Box
      //className={classes.root}
      flexGrow={'1'}
      backgroundColor={'#CADFC8'}
      width={'100%'}
      paddingX={{ xs: 2, sm: 5, lg: 4 }}
      component='footer'
    >
    TAGADA
      <Divider />
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box py={1} textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography
              component={'p'}
              variant={'caption'}
              color={'textSecondary'}
            >
              <a href="https://www.digitalocean.com/?refcode=f4f90350d40b&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%202.svg" alt="DigitalOcean Referral Badge" /></a>
               avec 
              <a href="https://www.gatsbyjs.com/"> Gatsby</a>, 
              <a href="https://graphql.org/"> GraphQL</a>, 
              <a href="https://neo4j.com/"> Neo4j</a> , 
              <a href="https://github.com/aslushnikov/latex-online"> Latex-online </a>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box py={1} textAlign={{ xs: 'center', sm: 'right' }}>
            <Typography
              component={'p'}
              variant={'caption'}
              color={'textSecondary'}
            >
              © {data.site.siteMetadata.title} {new Date().getFullYear()}
            </Typography>
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/" css={css`
              color: darkgreen;
            `}>
              <img alt="Licence Creative Commons" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg" />
            </a>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
