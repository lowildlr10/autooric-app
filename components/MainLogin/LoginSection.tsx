'use client'
import React, { useState } from 'react'
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Stack, 
  InputAdornment, 
  IconButton 
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ILoginSectionProps } from '@/Interfaces'

const LoginSection = ({ formData, handleLogin, handleInputChange }: ILoginSectionProps) => {
  const [showPassword, setShowPassword] = useState(false)

  // Handle password visibility
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Card
      sx={{  
        borderRadius: '1.5em',
        textAlign: 'center',
        width: { xs: '45vw', md: '26em', xl: '30em' },
      }}
    >
      <CardContent
        sx={{  
          padding: { xs: '3em', md: '3.5em', xl: '4em'},
        }}
      >
        <Typography
          variant='h4'
          textAlign='center'
          fontWeight={600}
        >Hello!</Typography>
        <Typography 
          variant='body2'
          textAlign='center'
          fontWeight={500}
          mb={5}
        >Sign in to your account</Typography>
        
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <Stack 
            alignItems='center'
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete=""
              autoFocus
              focused
              onChange={handleInputChange}
              value={formData.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              focused
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleInputChange}
              value={formData.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={theme => ({  
                background: theme.palette.primary.light,
                py: '0.8em',
                borderRadius: 0,
                mt: 8,
                mb: 6,
                width: '80%',
              })}
              onClick={formData.username && formData.password ? handleLogin : undefined}
            >
              Sign In
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginSection