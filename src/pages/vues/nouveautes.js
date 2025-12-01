import React from "react"
import { css } from "@emotion/react"
import { graphql , Link} from "gatsby"
import { rhythm } from "../../utils/typography"

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

import IconeVueDePres from "/src/components/icones/iconevuedepres";
import IconeDownloadPdf from "/src/components/icones/iconedownloadpdf";

export default function ListeNouveautePage({ data }){
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
              Articles du journal mathématique: les {data.allMarkdownRemark.totalCount} plus récents
            </Typography>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <div key={node.id}
                   css={css`
                     margin-top: ${rhythm(1 / 2)};
                   `}
              >
                <Link
                  to={node.fields.slug}
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <Typography component="h4" variant="h7"
                  >
                    {node.frontmatter.title}{" "}
                  
                    <span
                      css={css`
                        color: #555;
                        font-size: x-small
                      `}
                    >
                      — {node.frontmatter.date}
                    </span>
                  </Typography>
                  <Container maxWidth="md">
                    <Typography component="body1" variant="body2">
                      {node.excerpt}
                    </Typography>
                  </Container>
                </Link>
              </div>
            ))}
          </Container>

        <Container maxWidth="md" sx={{mt: 3}}>
          <Typography component="h3" variant="h5">
            Modifications de documents: les {data.maquis.documents.length} plus récentes  
          </Typography>
          <Container maxWidth="md" sx={{ mb: 2 }}>
            <TableContainer >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6"> 
                        titre
                      </Typography>
                    </TableCell>
                    <TableCell>
                      lien vers pdf 
                    </TableCell>
                    <TableCell>
                      maquis 
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody typography="body1">
                  {data.maquis.documents
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(({titre, date, url,_id},index)=>(
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body1">
                            {titre}
                          </Typography>
                          <Typography variant="body2">
                            {date.slice(0,10)}
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
                  ))}
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
        allMarkdownRemark(
          filter: {frontmatter: {theme: {eq: "mathjournal"}}},
          sort: {frontmatter: {date: DESC}},
          limit: 5
        ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }

    maquis {
      documents(sort: {date: DESC}, limit: 25) {
        _id
        titre
        date
        url
      }
    }
  }
`
