import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import {Grid, Box, Typography} from "@mui/material"
import { css } from "@emotion/react"
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
      }
    `
  )
  return (
    <div>
      <Box
        flexGrow={'1'}
        backgroundColor={'#CADFC8'}
        width={'100%'}
        paddingX={{ xs: 2, sm: 5, lg: 4 }}
      >
        <Grid container spacing={2}>
            <Grid item xs={6}>
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
            <Grid item xs={3}>
              <Link  to= "/vues">
                <Typography variant="h5" component="h2"
                  css={css`
                      color: darkgreen;
                      display: inline-block;
                      margin: 0 auto;
                      padding: ${rhythm(2)};
                      padding-top: ${rhythm(1.5)};
                      `}
                >
                  Vues
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link to= "/developpement">
                <Typography variant="h5" component="h2"
                  css={css`
                      color: darkgreen;
                      display: inline-block;
                      margin: 0 auto;
                      padding: ${rhythm(2)};
                      padding-top: ${rhythm(1.5)};
                      `}
                >  
                  Développement
                </Typography>
              </Link>
            </Grid>
        </Grid>
      </Box>
        {children}
      <Footer/>
    </div>
  )
}

