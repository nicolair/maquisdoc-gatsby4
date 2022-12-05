import React from "react"
import { css } from "@emotion/react"
import { Link } from "gatsby"
import {useLazyQuery, gql } from "@apollo/client"
//import { rhythm } from "../utils/typography"

import Layout from "../../components/layout"
import TitreVue from "../../components/titrevue";
import IconeVueDePres from "/src/components/icones/iconevuedepres";
import IconeDownloadPdf from "/src/components/icones/iconedownloadpdf";

import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const GET_COURS_QUERY = gql`
  query getCours($mot : String){
    searchcours(mot: $mot){
      titre,
      description,
      url,
      _id
    }  
  }
`

export default function RecherchePage({ data }) {
  const [getCrs, { loading, data: coursData}] = useLazyQuery(GET_COURS_QUERY)
  
  const onChercherCliqué = e => {
    const mot_a_chercher = document.getElementById("mot_a_chercher").value
    getCrs({ variables:{mot:mot_a_chercher}})
    //console.log(mot_a_chercher)
    //console.log(pbsData)
  }
  
  return (
    <Layout>
      <Container maxWidth="md" sx={{mt: 3}}>
        <TitreVue>
          Vue de recherche dans les textes de cours
        </TitreVue> {loading}
        <Grid 
          container
          mt={1}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Tooltip title="utiliser * comme wildcard">
              <TextField variant="outlined" 
                         label="Chaine à chercher" 
                         id="mot_a_chercher"
              />
            </Tooltip>
          </Grid>
            <Grid item>
              <Tooltip title="dans la description et le nom du fichier de base">
                <Button onClick={onChercherCliqué} 
                        variant="outlined" 
                        css={css`color: darkgreen;`}>
                  Chercher
                </Button>
              </Tooltip>
            </Grid>
        </Grid>
        <Container maxWidth="md" sx={{ mb: 2 }}>
          <TableContainer >
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> titre </TableCell>
                  <TableCell> nom/lien pdf</TableCell>
                  <TableCell> détail </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { (coursData) && coursData.searchcours.map(({titre, description,url,_id},index)=>(
                  <TableRow key={index}>
                    <TableCell> 
                      <Typography variant="body1">
                        {titre}
                      </Typography>
                    </TableCell>
                    <TableCell> 
                      <a 
                        css={css`color:darkgreen;`}
                        href= {url}
                        target="blank"
                        rel="noopener noreferrer"
                      >
                        <IconeDownloadPdf />
                      </a>
                    </TableCell>
                    <TableCell>
                      <Link 
                        css={css`color: darkgreen;`}
                        to= {"/document_"+_id}
                      >
                        <IconeVueDePres />
                      </Link>
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
        </Container >
      </Container>
    </Layout>
  )
}

