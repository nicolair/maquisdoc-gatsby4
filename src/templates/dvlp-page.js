import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import LayoutDvlpt from "../components/layoutdvlpt"

import Container from '@mui/material/Container';

export default function DvlpPage({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <LayoutDvlpt>
        <Container maxWidth="md" sx={{typography:'body1'}}>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
