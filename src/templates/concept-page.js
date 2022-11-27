import React from "react"
import { css } from "@emotion/react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import LayoutVues from "../components/layoutvues"
import TitreVue from "../components/titrevue"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import IconeVueDePres from "/src/components/icones/iconevuedepres";

const ConceptPage = ({ data, pageContext}) => {
  const concept = pageContext.concept
  const conceptsvoisins = concept.conceptsvoisins
  conceptsvoisins.sort((ca,cb)=>{
    if (ca.conceptLitteral <= cb.conceptLitteral)
      return -1
    else
      return 1
  })
  const docsvoisins = concept.documentsvoisins
  docsvoisins.sort((doca,docb) =>{
    if (doca.typeRel < docb.typeRel)
      {return -1}
    else if ((doca.typeRel = docb.typeRel) && (doca.docTitre < docb.docTitre))
      {return -1}
    else 
      {return 1} 
  })

  const [pageD, setPageD] = React.useState(0);
  const [rowsPerPageD, setRowsPerPageD] = React.useState(3);
  const handleChangePageD = (event, newPageD) => {
    setPageD(newPageD);
  };
  const handleChangeRowsPerPageD = (event) => {
    setRowsPerPageD(parseInt(event.target.value, 6));
    setPageD(0);
  };

  const [pageC, setPageC] = React.useState(0);
  const [rowsPerPageC, setRowsPerPageC] = React.useState(3);
  const handleChangePageC = (event, newPageC) => {
    setPageC(newPageC);
  };
  const handleChangeRowsPerPageC = (event) => {
    setRowsPerPageC(parseInt(event.target.value, 6));
    setPageC(0);
  };

  return (
        <Layout>
          <LayoutVues>
            <Container maxWidth="md" sx={{mt: 3, mb:3}}>
              <TitreVue 
                nomnoeud={concept.litteral}
                tooltiptitle="litteral du concept"
              >
                Vue du concept
              </TitreVue>
              <Container maxWidth="md" sx={{ mb: 4 }}>
                <TableContainer>
                  <Table  aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colspan={3}>
                          <Typography variant="h6">
                            Concepts voisins
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {conceptsvoisins
                        .slice(pageC * rowsPerPageC, pageC * rowsPerPageC + rowsPerPageC)
                        .map(({conceptLitteral,out,typeRel,conceptId},index)=>(
                          <TableRow key={index}>
                            <TableCell>{out ? 
                              concept.litteral:
                              <Stack direction="row" 
                                     spacing={1}
                                     alignItems="center"
                              >
                                {conceptLitteral} 
                                <Link
                                  css={css`color: darkgreen; margin-left: 2px`}
                                  to={"/concept_"+conceptId}
                                >
                                  <IconeVueDePres />
                                </Link>
                              </Stack>}
                            </TableCell>
                            <TableCell>
                                {typeRel}
                            </TableCell>
                            <TableCell>
                              {out ? 
                              <Stack direction="row" 
                                     spacing={1}
                                     alignItems="center"
                              >
                                {conceptLitteral}
                                <Link
                                  css={css`color: darkgreen;  margin-left: 2px`}
                                  to={"/concept_"+conceptId}
                                >
                                  <IconeVueDePres />
                                </Link>
                              </Stack>: 
                                concept.litteral 
                              }
                            </TableCell>
                          </TableRow>    
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[3, 6, 12]}
                  component="div"
                  count={conceptsvoisins.length}
                  rowsPerPage={rowsPerPageC}
                  page={pageC}
                  onPageChange={handleChangePageC}
                  onRowsPerPageChange={handleChangeRowsPerPageC}
                />

              </Container>
              <Container maxWidth="md">
                <TableContainer >
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colspan={3}>
                          <Typography variant="h6">
                            Documents voisins
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {docsvoisins
                        .slice(pageD * rowsPerPageD, pageD * rowsPerPageD + rowsPerPageD)
                        .map(({typeRel,out,docType,docTitre,docId,docUrl},index)=>(
                          <TableRow key={index}>
                            <TableCell>
                              {out ?
                                 concept.litteral:
                                 <Stack direction="row" 
                                     spacing={1}
                                     alignItems="center"
                                 >
                                   {docType} &nbsp; {docTitre}
                                     <Link
                                       css={css`color: darkgreen; margin-left: 2px`}
                                       to={"/document_" + docId}
                                     >
                                       <IconeVueDePres />
                                     </Link>
                                  </Stack>
                              }
                            </TableCell>
                            <TableCell>
                              {typeRel} 
                            </TableCell>
                            <TableCell>
                              {out ?
                              <Stack direction="row" 
                                     spacing={1}
                                     alignItems="center"
                                 >
                                  {docType} &nbsp; {docTitre}
                                    <Link
                                      css={css`color: darkgreen; margin-left: 2px`}
                                      to={"/document_"+docId}
                                    >
                                      <IconeVueDePres />
                                    </Link> 
                                </Stack>:
                                concept.litteral
                              }  
                            </TableCell>
                          </TableRow>    
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[3, 6, 12]}
                  component="div"
                  count={docsvoisins.length}
                  rowsPerPage={rowsPerPageD}
                  page={pageD}
                  onPageChange={handleChangePageD}
                  onRowsPerPageChange={handleChangeRowsPerPageD}
                />
              </Container>
            </Container>
          </LayoutVues>
        </Layout>
    )
}

export default ConceptPage
