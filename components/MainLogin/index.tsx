'use client'
import React, { useState } from 'react'
import { Stack } from '@mui/material'
import TitleSection from './TitleSection'
import LoginSection from './LoginSection'
import FooterNav from '../NavBar/FooterNav'
import Loader from '../Loader'
import API from '@/utilities/API'
import { ILoginProps } from '@/Interfaces/index'
import { toast } from 'react-hot-toast'
import useAccessToken from '@/hooks/useAccessToken'

const MainLogin = () => {
  const { saveAccessToken } = useAccessToken()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ILoginProps>({
    username: '',
    password: '',
  })

  // Handle textfield changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  // Handle login form submission using API utilities
  const handleLogin = async () => {
    setLoading(true)

    // Call login API
    const response = await API.login(formData.username, formData.password)

    if (response?.error) {
      toast.error(response?.message)
      setLoading(false)
      handleClearFields()
      return
    }
    
    // Save access token to local storage
    saveAccessToken(response?.access_token)

    // Show success toast
    toast.success('Login successful!')
    
    // Redirect to official receipt
    window.location.href = '/official-receipt'
    handleClearFields()
  }
    
  // Handle clear fields
  const handleClearFields = () => {
    setFormData({ username: '', password: '' })
  }
  
  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      {loading && <Loader />}

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
        <LoginSection 
          formData={formData} 
          handleLogin={handleLogin} 
          handleInputChange={handleInputChange}
        />
      </Stack>
      <FooterNav />
    </Stack>
  )
}

export default MainLogin