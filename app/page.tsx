import React from 'react'
import { Stack } from '@mui/material'
import ImageBackdrop from '@/components/ImageBackdrop'
import LoginNav from '@/components/NavBar/LoginNav'
import MainLogin from '@/components/MainLogin'

const LoginPage = () => {
  return (
    <Stack
      sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <LoginNav />
      <ImageBackdrop />
      <MainLogin />
    </Stack>
  );
}

export default LoginPage