import React  from 'react'
import 'katex/dist/katex.min.css'
import Latex from "react-latex-next"

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper"

const echapp = latex => {
    var ch = latex.replace(/\\bigskip/g,'')
    ch = ch.replace('/','//')
    ch = ch.replace(/{\\'e}/g,'é')
    ch = ch.replace(/\\'e/g,'é')
    ch = ch.replace(/\\'E/g,'É')
    ch = ch.replace(/\\'{E}/g,'É')
    ch = ch.replace(/{\\'E}/g,'É')
    ch = ch.replace(/\\'{e}/g,'é')
    ch = ch.replace(/{\\`a}/g,'à')
    ch = ch.replace(/\\`a/g,'à')
    ch = ch.replace(/\\`{a}/g,'à')
    ch = ch.replace(/\\begin{displaymath}/g,'\\[')
    ch = ch.replace(/\\end{displaymath}/g,'\\]')
    ch = ch.replace(/\\begin{quote}/g,"<p>")
    ch = ch.replace(/\\end{quote}/g,'</p>')
    ch = ch.replace(/\\newline/g,'<br>')
    ch = ch.replace(/multline/g,'align')
    return ch
}

export default function LatexBlock(props){
  const latex = echapp(props.latex)
  const delimiters = [
    { left: '$$', right: '$$', display: true },
    { left: '\\(', right: '\\)', display: false },
    { left: '$', right: '$', display: false },
    { left: '\\[', right: '\\]', display: true },
    { left: '\\begin{align*}', right: '\\end{align*}', display: true },
  ]
  return (
    <Container 
      className="LatexBlock"
      maxWidth="md"
    >
      <Paper
        elevation={2} 
        sx={{mt: 1, p: 2}}>
        <Latex delimiters={delimiters}>{latex}</Latex>
      </Paper>
    </Container>
  );
}
