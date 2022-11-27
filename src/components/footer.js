import React from 'react'
import {Grid, Box, Link, Typography} from "@mui/material"
import { useStaticQuery, graphql } from 'gatsby'

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
      flexGrow={'1'}
      backgroundColor={'#CADFC8'}
      width={'100%'}
      paddingX={{ xs: 2, sm: 5, lg: 4 }}
      component='footer'
    >
      
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
          <Link href="https://www.digitalocean.com/?refcode=f4f90350d40b&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%202.svg" alt="DigitalOcean Referral Badge" /></Link>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">
               avec 
              <Link href="https://www.gatsbyjs.com/" underline="hover"> Gatsby</Link>, 
              <Link href="https://graphql.org/" underline="hover"> GraphQL</Link>, 
              <Link href="https://neo4j.com/" underline="hover"> Neo4j</Link> , 
              <Link href="https://github.com/aslushnikov/latex-online" underline="hover"> Latex-online </Link>
           </Typography>
        </Grid>
        <Grid item xs={2}>
            <Link rel="license" href="http://creativecommons.org/licenses/by/4.0/" >
              <img alt="Licence Creative Commons" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg" />
            </Link>
        </Grid>
        <Grid item xs={3}>
            <Typography paddingX={1} variant="body2">
              © {data.site.siteMetadata.title} {new Date().getFullYear()}
            </Typography>
        </Grid>

      </Grid>
    </Box>
  )
}
