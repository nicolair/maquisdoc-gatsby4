import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
//import { rhythm } from "../utils/typography"

import {useLazyQuery, gql } from "@apollo/client";

import Layout from "../../components/layout";
import TitreVue from "../../components/titrevue";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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

const GET_CONCEPTS_QUERY = gql`
  query getConcepts($mot : String){
    searchconcepts(mot: $mot){
      litteral,
      description,
      _id
    }  
  }
`

export default function RecherchePage({ data }) {
  const [getCncpts, { loading, data: conceptsData}] = useLazyQuery(GET_CONCEPTS_QUERY)
  
  const onChercherCliqué = e => {
    const mot_a_chercher = document.getElementById("mot_a_chercher").value
    getCncpts({ variables:{mot:mot_a_chercher}})
    //console.log(mot_a_chercher)
    //console.log(pbsData)
  }
  
  return (
    <Layout>
      <Container maxWidth="md" sx={{mt: 3}}>
        <TitreVue>
          Vue de recherche dans les concepts
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
          <TableContainer>
            <Table  aria-label="simple table">
              <TableHead >
                { (conceptsData) && (conceptsData.searchconcepts.length>0) && (
                    <TableRow >
                      <TableCell>
                        <Typography variant="h6">
                          littéral  
                        </Typography>
                      </TableCell>
                      <TableCell> maquis </TableCell>
                    </TableRow >)
                }
              </TableHead>
              <TableBody >
                { (conceptsData) && conceptsData.searchconcepts.map(({litteral, description,_id},index)=>(
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body1">
                        {litteral}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link 
                        css={css`color: darkgreen;`}
                        to= {"/concept_"+_id}
                      >
                        <IconeVueDePres />
                      </Link> 
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Container>
    </Layout>
  )
}

