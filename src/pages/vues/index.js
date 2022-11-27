import React from "react"

import Layout from "../../components/layout"
import LayoutVues from "../../components/layoutvues"
import {Container} from "@mui/material"

export default function Vues({ data }) {
  return (
    <Layout>
      <LayoutVues>
        <Container maxWidth="md" sx={{mt: 3, mb:3, typography:'body1'}}>
            Maquisdoc contient des centaines de documents.<br/>
            Chaque vue présente une partie de ces documents.
        </Container>
      </LayoutVues>
    </Layout> 
  )
}
