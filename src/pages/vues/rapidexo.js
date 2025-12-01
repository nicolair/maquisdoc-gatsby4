import React, {useState }  from "react";
import { css } from "@emotion/react";
import { graphql } from "gatsby";

import { useFormik } from "formik";
import { trackPromise } from "react-promise-tracker";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
//import {ThreeDots} from "react-loader-spinner";
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Toolbar from "@mui/material/Toolbar"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import Layout from "../../components/layout";
import LatexBlock from "../../components/latexblock";
import TitreVue from "../../components/titrevue";


/*
  export const CompilIndicator = props => {
      const { promiseInProgress } = usePromiseTracker();
      return (
          promiseInProgress &&
          <div
            style={{
              width: "100%",
              height: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            Compilation ... Création des liens ... C'est assez long ... &nbsp; 
            <ThreeDots color="darkgreen" height="50" width="50" />
          </div>
      );    
  };
*/

const RapidexoPage = ({ data })=> {
  /*
   Plusieurs états pour gérer l'application
     *roleState: valeur parmi 'choixliste',
       'choixvisu', 'lien pdf', 'visulatex'
     *listeRefsState: valeur liste de 30 chemins vers les fichiers
     *pdfUrlState: url du fichier pdf compilé à télécharger
     *numState: numéro de 0 à 30 de l'exercice courant
     *latexState: le code de l'exercice courant
  */
//const flaskServerUrl = `http://127.0.0.1:5000`;
//const flaskServerUrl = process.env.FLASK_URL
  const  flaskServerUrl = data.site.siteMetadata.servers.latexgithub.url

  const latexonline = "https://latexonline.cc/compile?url="

  const themes = {        
    'Calcloc':{'nom':'Calcul local','nb':0},
    'Courbpar':{'nom':'Courbes paramétrées','nb':0},
    'Ctrigus':{'nom':'Calcul trigonométrique','nb':0},
    'Deriv':{'nom':'Dérivation','nb':0},
    'Equadiff':{'nom':'Équations differentielles','nb':0},
    'Fracrat':{'nom':'Fractions rationnelles','nb':0},
    'Geomel':{'nom':'Géométrie élémentaire','nb':0},
    'Integ':{'nom':'Intégration','nb':0},
    'LinMat':{'nom':'Matrices','nb':0},
    'Lineuc':{'nom':'Algèbre linéaire euclidienne','nb':0},
    'Polynom':{'nom':'Polynômes','nb':0},
    'Systlin':{'nom':'Systèmes linéaires','nb':0},
    'Vocens':{'nom':'Vocabulaire ensembliste','nb':0}
  }
  const themeslist = []
  const initval = {}
  for (let theme in themes){
    initval[theme] = themes[theme]['nb']
    themeslist.push(theme)
  }

  const [roleState,setRole] = useState(0)
  const [listeRefsState,setlisteRefs] = useState([])
  const [pdfUrlState,setpdfUrl] = useState('')
  const [pdfUrlCorrState,setpdfCorrUrl] = useState('')
  const [numState,setNum] = useState(0)
  const [latexState,setLatex] = useState('')
  
  
  const fetchREFS = data => {
      var getUrl = new URL(flaskServerUrl + '/getREFS')
      var params = formik.values
      Object.keys(params).forEach(key =>
          getUrl.searchParams.append(key,params[key])
      )
      //alert(JSON.stringify(formik.values))
      fetch( getUrl, {
          method: 'GET'}
          //mode: 'cors'}
      )
        .then(response => response.text())
        .then(function(resp){
           //console.log(resp);
           let lili = JSON.parse(resp)
           setlisteRefs(JSON.parse(resp));
           fetchLATEX(lili[0]);
           setRole(1)
          })
         .catch(function(error){
            console.log('tagada ' +flaskServerUrl+' ' + error);  
          })
  };
  
  const fetchCOMPIL = data => {
      var getUrl = new URL(flaskServerUrl + '/getCOMPIL')
      setRole('w')
      //alert('coucou de getCOMPIL', roleState)
      trackPromise(
      fetch( getUrl, {
          method: 'post',
          headers: {
              'Content-Type':'application/json'
          },
          body: JSON.stringify(listeRefsState)
      }))
        .then(resp => resp.json())
        .then(function(resp){
           //console.log(resp['latex_urlstr']);
           const pdfUrl = latexonline 
                        + flaskServerUrl
                        + '/getPDF/'
                        + resp['id_session'];
           setpdfUrl(pdfUrl);
           const pdfCorrUrl = latexonline 
                        + flaskServerUrl
                        + '/getCorrPDF/'
                        + resp['id_session'];
           setpdfCorrUrl(pdfCorrUrl);
           setRole(2)
          })
         .catch(function(error){
            console.log(error);  
          })
  };

  const pdfANCHOR = () => {
        return (
          <React.Fragment>
            Télécharger &nbsp;
            <a
               onClick= {()=>setRole(3)}
               href= {pdfUrlState}
               target= "_blank"
               rel= "noreferrer"
               download>
                 énoncé pdf
            </a>
            &nbsp; &nbsp;
            <a
              onClick= {()=>setRole(3)}
              href= {pdfUrlCorrState}
              target= "_blank"
              rel= "noreferrer"
              download>
                corrigé pdf 
            </a>
          </React.Fragment>)    
  };

  const validate = values => {
      const errors = {};
      let nbtotexos = 0;
      for (let key in values){
        nbtotexos += values[key];
      }
      if ( nbtotexos !== 30){
          errors.somme = "Le nombre total d'exercices doit être 30."
      }
      return errors;
  };
  
  const formik = useFormik({
    initialValues:initval,
    validate,
    onSubmit: fetchREFS
  });
 
  const themesINPUT = (bool) =>  {
      if (bool){ 
          return ( 
            <Container maxWidth="md" sx={{mt: 3}}>
              Pour chaque thème, choisir un nombre d'exercices. La somme de ces nombres doit être 30.
              <form onSubmit={formik.handleSubmit}>
                {formik.errors.somme}
                <Grid container spacing={2} mt={2}>
                  {themeslist.map( codetheme => 
                    <Grid xs={6}>
                      {themes[codetheme]['nom']}
                       <input
                         type="number"
                         key= {codetheme}
                         name={codetheme}
                         value={formik.values[codetheme]}
                         onChange={formik.handleChange}
                         min='0'
                         max='30'
                         css={css`margin-left:2%; width:40pt`}
                       />
                    </Grid>)
                  }
                  <Grid 
                    xs={12} 
                    display='flex' 
                    justifyContent='center'
                  >
                    <Button 
                      type="submit"
                      variant="contained"
                      css={css`background-color: darkgreen;`}
                    >
                      Soumettre 
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          )
      }
  };
 
  const listeMENU = (bool) => {
    if (bool) {
          //fetchLATEX(listeRefsState[numState]);
      return (
        <React.Fragment>
          <Typography variant='body1' sx={{mr: 2}}>
            Une liste de 30 exercices a été formée.
            {listeBUTTON()}
          </Typography>
          <Typography variant='body1'>
            Pour cette liste: 
          </Typography>
          {visuDIV(true)}
        </React.Fragment>
      )
    }
  };
  
  const fetchLATEX = (ref) => {
      var getUrl = new URL(flaskServerUrl + '/LATEX' );
      
      fetch( getUrl, {
          method: 'POST',
          headers: {
              'Content-Type':'application/json'
          },
          body: JSON.stringify(ref)
    }
      )
        .then(response => response.text())
        .then(function(resp){
           //console.log(resp);
           setLatex(resp)
          })
         .catch(function(error){
            console.log(error);  
          })
  };

  /*
  const chaineLatex = "$e^x$"
  class RapidexoLatex extends React.Component {
      constructor(props) {
          super(props);
          console.log('constructor de RapidexoLatex');
          console.log(props);
      }
      render() {
          return (
              <Latex> TAGADA  {chaineLatex} </Latex>
          )
      }
  }
  */
  
  const visuDIV = (bool) => {
      if (bool) {
        const listeRefs = listeRefsState
        const suiv = num => {
            let n = numState;
            n = (n + 1) % 30;
            fetchLATEX(listeRefs[n]);
            setNum((num) => (num + 1) % 30);
            
        }
        const prec = num => {
            let n = numState;
            n = (n + 29) % 30;
            fetchLATEX(listeRefs[n]);
            setNum((num) => (num + 29) % 30)
        }
        return (
          <Container maxWidth="md" sx={{mt: 3, mb:3}}>
            <p>Visualisation des 30 exercices un par un ou {compil[roleState]()}</p>
            <Toolbar>
              <Button 
                onClick={prec}
                variant="outlined" 
                sx={{ml: 2}}
                css={css`color: darkgreen;`}
                startIcon={<NavigateBeforeIcon />}
              /> 
              <Typography 
                variant="body1" 
                sx={{ml: 2}}
              >
                Ex. num. {numState}: {listeRefs[numState]}
              </Typography>
              <Button 
                onClick={suiv}
                variant="outlined" 
                sx={{mr: 2, ml: 2}}
                css={css`color: darkgreen;`}
                endIcon={<NavigateNextIcon />}
              />
            </Toolbar>
            <LatexBlock latex={latexState}/>
            <Container 
              maxwidth="md" 
              sx={{mt: 2}}
            > 
              <Typography variant='body2'>
                Cette vue est encore en développement. Comme la compilation en html n'est pas toujours correcte, le code Latex est présenté au dessous
              </Typography>
              <Typography variant='body2'>
                {latexState} 
              </Typography>
            </Container>
          </Container>
        )
      }
  };
  
  const compilBUTTON = () => {
    return (
      <Button  
        onClick= {fetchCOMPIL}
        variant="outlined"
        css={css`color: darkgreen;`}
      >
        Compiler feuille complète 
      </Button>
    )
  };

  const compil = { 1: compilBUTTON, 
                   2: pdfANCHOR, 
                   3: () => { return ('')} } 

  const listeBUTTON = () => {
    return (
      <Button 
        onClick= {()=>setRole(0)}
        css={css`color: darkgreen;`}
        variant='outlined'
      > 
        Nouvelle liste
      </Button>
    )
  };
  
      
  return (
    <Layout>
        <Container maxWidth="md" sx={{mt: 3}}>
        <TitreVue>
          Vue de l'outil "Rapidexos"
        </TitreVue>
        <div>
          <p>
            Cet outil permet de former des listes de 30 petits exercices techniques ("rapidexos") à traiter en une heure.
          </p>
          {themesINPUT(roleState === 0)}
          {listeMENU(roleState > 0)}
          CompilIndicator à placer
        </div>
        </Container>
    </Layout> 
  )
}

export default RapidexoPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        servers {
          latexgithub {
              url
          }
        }
      }
    }
  }
`
