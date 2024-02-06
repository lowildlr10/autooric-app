import React from 'react'
import { Stack } from '@mui/material'
import ImageBackdrop from '@/components/ImageBackdrop'
import LoginNav from '@/components/NavBar/LoginNav'
import FooterNav from '@/components/NavBar/FooterNav'
import TitleSection from '@/components/Login/TitleSection'
import LoginSection from '@/components/Login/LoginSection'

const Login = () => {
  return (
    <Stack
      sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <LoginNav />
      <ImageBackdrop />
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Stack  
          alignItems="center"
          height="100vh"
          width='50vw'
          sx={{ 
            backgroundColor: 'primary.dark',
            color: 'white',
            opacity: 0.97,
          }}
        >
          <TitleSection />
        </Stack>
        <Stack
          justifyContent="center" 
          alignItems="center"
          height="100vh"
          width='50vw'
          sx={{ 
            backgroundColor: '#F1F1F1',
           }}
        >
          <LoginSection />
        </Stack>
        <FooterNav />
      </Stack>
    </Stack>
  );
}

export default Login