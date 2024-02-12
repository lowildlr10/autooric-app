import React from 'react'
import { CircularProgress, Stack } from '@mui/material'

const SectionLoader = () => {
  return (
    <Stack
      width='100%'
      justifyContent='center'
      justifyItems='center'
      textAlign='center'
      alignItems='center'
      pt={5}
      pb={8}
    >
      <CircularProgress sx={{ color: 'primary.main' }} />
    </Stack>
  )
}

export default SectionLoader
