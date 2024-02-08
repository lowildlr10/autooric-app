'use client'
import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import TitleSection from './TitleSection'
import LoginSection from './LoginSection'
import FooterNav from '../NavBar/FooterNav'
import Loader from '../Loader'
import API from '@/utilities/API'
import { ILoginProps } from '@/Interfaces/index'
import { toast } from 'react-hot-toast'
import useAccessToken from '@/hooks/useAccessToken'
import useUserInfo from '@/hooks/useUserInfo'

const MainLogin = () => {
  const { accessToken, saveAccessToken } = useAccessToken()
  const { isAuthenticated, userLoading } = useUserInfo(accessToken ?? '')
  const [loading, setLoading] = useState(true)
  const [loginLoading, setLoginLoading] = useState(false)
  const [formData, setFormData] = useState<ILoginProps>({
    username: '',
    password: '',
  })

  // Handle global loading
  useEffect(() => {
    if (userLoading || loginLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [userLoading, loginLoading])

  // Check if user is already logged in
  useEffect(() => {
    if (loading) return
    if (!userLoading && isAuthenticated) {
      toast.success('Logging in...')
      window.location.href = '/official-receipt'
    }
  }, [loading, userLoading, isAuthenticated])

  // Handle textfield changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  // Handle login form submission using API utilities
  const handleLogin = () => {
    setLoginLoading(true)

    // Call login API
    API.login(formData.username, formData.password)
      .then((response) => {
        const res = response?.data.data
        
        if (res?.error) {
          toast.error(res?.message)
          setLoginLoading(false)
          handleClearFields()
          return
        }

        saveAccessToken(res?.access_token)
        toast.success(res?.message)
        handleClearFields()
        window.location.href = '/official-receipt'
      })
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
          loading={loading}
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