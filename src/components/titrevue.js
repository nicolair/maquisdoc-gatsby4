import React from "react"
import { css } from "@emotion/react"

import Typography from "@mui/material/Typography"
import Tooltip from '@mui/material/Tooltip';

const TitreVue = (props) => {
  return (
    <Typography component="h3" variant="h5" sx={{mt: 2, mb:2}}>
      {props.children} 
      {props.tooltiptitle ?
        <Tooltip title={props.tooltiptitle} >
          <span css={css`margin-left: 5px; font-style:italic`}>{props.nomnoeud}</span>
        </Tooltip>:
        <span css={css`margin-left: 5px; font-style:italic`}>{props.nomnoeud}</span>}
    </Typography>
  )
}

export default TitreVue
