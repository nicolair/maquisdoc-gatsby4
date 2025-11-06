import React from "react"
import { css } from "@emotion/react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

import Layout from "../../components/layout"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';

import IconeVueDePres from "/src/components/icones/iconevuedepres";
import IconeDownloadPdf from "/src/components/icones/iconedownloadpdf";

export default function FeuillesExercices({ data }) {
  //console.log(data)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <Layout>
        <Container maxWidth="md" sx={{mt: 3}}>
          <Typography component="h3" variant="h5">
            Vue des {data.maquis.documents.length} feuilles d'exercices en liste
          </Typography>
          <Container maxWidth="md" sx={{ mb: 2 }}>
            <TableContainer >
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">
                        Thème
                      </Typography>
                    </TableCell>
                    <TableCell>lien vers pdf</TableCell>
                    <TableCell>Feuille</TableCell>
                    <Tooltip title="associé au thème">
                      <TableCell>Concept</TableCell>
                    </Tooltip>
                  </TableRow>
                </TableHead>
                <TableBody typography="body1">
                  {data.maquis.documents
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(( feuille , index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body1">
                          {feuille.titre}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <a
                          css={css`color: darkgreen;`}
                          href = { feuille.url} 
                          target="_blank" rel="noopener noreferrer"
                        >
                          <IconeDownloadPdf /> 
                        </a>
                      </TableCell>
                      <TableCell>
                        <Link 
                          css={css`color: darkgreen;`}
                          to= {"/document_" + feuille._id}
                        >
                          <IconeVueDePres />
                        </Link> 
                      </TableCell>
                      <TableCell> 
                        <Link 
                          css={css`color: darkgreen;`}
                          to= {"/concept_" + feuille.conceptsEVAL[0]._id}
                        >
                          <IconeVueDePres />
                        </Link> 
                      </TableCell>
                    </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer >
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.maquis.documents.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Container>
        </Container>
    </Layout>
  )
}

export const query = graphql`
  query { 
    maquis {
      documents(sort: {titre: ASC}, 
                where: {typeDoc: {eq: "liste exercices"}}) {
        titre
        _id
        typeDoc
        url
        urlSrc
        urlEnon
        urlCorr
        urlSrcEnon
        urlSrcCorr
        conceptsEVAL {
          _id
          litteral
        }
      }
    }
  }
`
