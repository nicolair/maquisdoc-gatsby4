import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";

import {useLazyQuery, gql } from "@apollo/client";

import Layout from "../../components/layout";
import TitreVue from "../../components/titrevue";

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

import IconeVueDePres from "/src/components/icones/iconevuedepres";
import IconeDownloadPdf from "/src/components/icones/iconedownloadpdf";

const GET_PBS_QUERY = gql`
  query getPbs($mot : String){
    searchpbs(mot: $mot){
      _id,
      titre,
      description,
      url
    }  
  }
`

export default function RecherchePage({ data }) {
  const [getPbs, { loading, data: pbsData}] = useLazyQuery(GET_PBS_QUERY)
  
  const onChercherCliqué = e => {
    const mot_a_chercher = document.getElementById("mot_a_chercher").value
    getPbs({ variables:{mot:mot_a_chercher}})
    //console.log(mot_a_chercher)
    //console.log(pbsData)
  }
  
  return (
    <Layout>
        <Container maxWidth="md" sx={{mt: 3}}>
          <TitreVue>
            Vue de recherche dans les problèmes
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
                           id="mot_a_chercher" />
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
                <TableHead >
                  { (pbsData) && (pbsData.searchpbs.length>0) && (
                    <TableRow >
                      <TableCell>
                        <Typography variant="h6">
                          description  
                        </Typography>
                      </TableCell>
                      <TableCell> lien vers pdf </TableCell>
                      <TableCell> maquis </TableCell>
                    </TableRow >)
                  }
                </TableHead>
                <TableBody typography="body1">
                  { (pbsData) && pbsData.searchpbs.map(({titre,_id, description,url},index)=>(
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body1">
                          {description}
                          <Tooltip title="Nom de base du fichier">
                            <small> ({titre})</small>
                          </Tooltip>
                        </Typography >
                      </TableCell>
                      <TableCell> 
                        <a 
                          css={css`color:darkgreen;`}
                          href= {url}
                          target="blank"
                          rel="noopener noreferrer">
                            <IconeDownloadPdf />
                        </a>
                      </TableCell>
                      <TableCell>
                        <Link 
                          css={css`color: darkgreen;`}
                          to= {"/document_" + _id}
                        >
                          <IconeVueDePres />
                        </Link>
                      </TableCell>
                    </TableRow>
                   )) }
                </TableBody>
              </Table >
            </TableContainer >
          </Container>
        </Container>
    </Layout>
  )
}

