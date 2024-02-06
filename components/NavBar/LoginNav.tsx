import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'

const LoginNav = () => {
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{  
          minHeight: { xs: '3em', sm: '3.5em' },
        }}
      >
        <Button 
          href="/"
          color="inherit"
          sx={{  
            textTransform: 'none',
            fontSize: { xs: '1rem', sm: '1.125rem' },
          }}
        >AutoORIC</Button>
      </Toolbar>
    </AppBar>
  )
}

export default LoginNav