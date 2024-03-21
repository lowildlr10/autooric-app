import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { grey } from '@mui/material/colors'

const Loader = () => {
  return (
    <Backdrop
      sx={{ color: grey[900], zIndex: 100001}}
      open={true}
    >
      <CircularProgress sx={{ color: grey[50] }} />
    </Backdrop>
  )
}

export default Loader
