import React from "react"
import { css } from "@emotion/react"
import { Link, graphql } from "gatsby"
import { rhythm } from "../../utils/typography"

import Layout from "../../components/layout"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

export default function Devlopmt({ data }) {
  return (
    <Layout>
          <Container maxWidth="md" sx={{mt: 3}}>
            <Typography component="h3" variant="h5">
              Journal : {data.allMarkdownRemark.totalCount} articles
            </Typography>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <div key={node.id}
                   css={css`
                     margin-top: ${rhythm(1 / 2)};
                   `}
              >
                <Link
                  to={node.fields.slug}
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <Typography component="h4" variant="h6"
                      css={css`
                        color: darkgreen;
                      `}
                  >
                    {node.frontmatter.title}{" "}
                  
                    <span
                      css={css`
                        color: #555;
                        font-size: x-small
                      `}
                    >
                      — {node.frontmatter.date}
                    </span>
                  </Typography>
                  <Container maxWidth="md">
                    <Typography component="body1" variant="body2">
                      {node.excerpt}
                    </Typography>
                  </Container>
                </Link>
              </div>
            ))}
          </Container>
    </Layout> 
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {theme: {eq: "journal"}}}, 
                      sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
