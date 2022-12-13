import * as React from "react"
import {Container} from "@mui/material"
import Layout from "../components/layout"

// markup
const IndexPage = () => {
  return (
    <Layout>
      <Container maxWidth="sm">
        <p>
          Maquisdoc est un projet d'organisation et de diffusion de documents pédagogiques.
        </p>
        <p>
          Ce site présente des documents pédagogiques (menu "Vues" ) ainsi que leur organisation et les outils pour les diffuser (menu "Projet").
        </p>
        <p>
          Les documents proposés portent essentiellement sur les mathématiques en classe de mpsi (analogue en France à une première année d'université).<br/>
          Ils peuvent servir à la préparation d'un concours d'enseignement (capes ou agrégation).
        </p>
      </Container>
    </Layout>
  )
}

export default IndexPage
