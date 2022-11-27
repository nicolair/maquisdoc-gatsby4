import React from "react"
import  {graphql }  from "gatsby"

import Layout from "../components/layout"
import LayoutDvlpt from "../components/layoutdvlpt"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"


export default function JrnlArt({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
    <LayoutDvlpt>
      <Container maxWidth="md" sx={{mt: 3}}>
        <Typography component="h3" variant="h5">
            Article:  {post.frontmatter.title}
        </Typography>
        <Container maxWidth="md" 
                   sx={{mt: 3}} 
                   dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
    </LayoutDvlpt>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
