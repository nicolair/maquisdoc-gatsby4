import React from "react"
import Layout from "../../components/layout"
import LayoutDvlpt from "../../components/layoutdvlpt"
import {Container} from "@mui/material"

export default function Devlopmt({ data }) {
  return (
    <Layout>
      <LayoutDvlpt>
          <Container maxWidth="md" sx={{mt: 3, mb:3, typography:'body1'}}>
          <p>
            Cette partie du site documente l'organisation des données et les applications qui les gèrent.
          </p>
          <p>
            Le projet est en développement et le développeur en apprentissage.<br/> 
            Le journal présente des reflexions qui ont ponctué cette progression.
          </p>
          <p>
            Un <a href="https://github.com/users/nicolair/projects/1" target="_blank" rel="noreferrer">tableau de progression</a> est présenté sur GitHub.<br/>
          </p>
          </Container>
      </LayoutDvlpt>
    </Layout> 
  )
}
