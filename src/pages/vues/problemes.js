import React from "react"
import { css } from "@emotion/react"
import { graphql , Link} from "gatsby"

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

import Layout from "../../components/layout"
import LayoutVues from "../../components/layoutvues"
import TitreVue from "../../components/titrevue"
import IconeVueDePres from "/src/components/icones/iconevuedepres";
import IconeDownloadPdf from "/src/components/icones/iconedownloadpdf";

export default function ProblemesPage({ data }){
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
      <LayoutVues>
        <Container maxWidth="md" sx={{mt: 3}}>
          <TitreVue>
            Liste des {data.maquis.problemedocuments.length} problèmes
          </TitreVue>
          <Link
            css={css`color: darkgreen;`}
            to="../recherche1"
          >
            Recherche par mot <small>(nom et description)</small>
          </Link>
          <Container maxWidth="md" sx={{ mb: 2 }}>
              <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead >
                    <TableRow>
                      <TableCell><Typography variant="h6"> 
                        description 
                      </Typography></TableCell>
                      <TableCell> lien vers pdf </TableCell>
                      <TableCell> maquis </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody typography="body1">
                    {data.maquis.problemedocuments
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(({_id,titre, description,url,},index)=>(
                      <TableRow key={index}>
                        <TableCell> 
                          <Typography variant="body1">
                            {description}
                            <Tooltip title="Nom de base du fichier">
                              <small> ({titre})</small>
                            </Tooltip>
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
                            to= {"/document_" + _id}
                          >
                            <IconeVueDePres />
                          </Link>
                        </TableCell>
                      </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.maquis.problemedocuments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </Container>
        </Container>
      </LayoutVues>
    </Layout>
  )
}

export const query = graphql`
  query {
    maquis {
      problemedocuments {
        _id
        titre
        description
        url
      }
    }
  }
`
