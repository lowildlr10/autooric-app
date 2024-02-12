import { AppBar, Toolbar, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

const FooterNav = () => {
  return (
    <AppBar
      position='absolute'
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: '1.9em', sm: '2.3em' } }}>
        <Typography
          variant='body2'
          align='center'
          sx={{
            flexGrow: 1,
            fontWeight: 'semibold',
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
          }}
        >
          {'All rights reserved © '}
          {moment().format('YYYY')}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default FooterNav
