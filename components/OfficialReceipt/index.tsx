'use client'
import React, { useEffect, useState } from 'react'
import useAccessToken from '@/hooks/useAccessToken'
import useUserInfo from '@/hooks/useUserInfo'
import Loader from '../Loader'
import MiniVariantDrawer from '../Drawer/MiniVariantDrawer'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import { Stack } from '@mui/material'
import SystemDialog from '../SystemDialog'
import { IOpenDialog } from '@/Interfaces'

const OfficialReceipt = () => {
  const { accessToken, forceRelogin } = useAccessToken()
  const { userInfo, isAuthenticated, userLoading } = useUserInfo(accessToken ?? '')
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState<IOpenDialog>({
    logout: false
  })

  // Handle global loading
  useEffect(() => {
    if (userLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [userLoading])
  
  // Check if user is already logged in
  useEffect(() => {
    if (loading) return
    if (!userLoading && !isAuthenticated) forceRelogin()
  }, [isAuthenticated, loading, userLoading])

  // Handle logout using API utilities
  const handleLogout = () => {
    setLogoutLoading(true)

    if (accessToken) {
      API.logout(accessToken)
        .then((response) => {
          const res = response?.data.data

          if (res?.error) {
            toast.error(res?.message)
            setLogoutLoading(false)
            return
          }

          toast.success(res?.message)
          forceRelogin()
          setLogoutLoading(false)
        })
    } else {
      forceRelogin()
      setLogoutLoading(false)
    }
  }

  // Handle dialog open
  const handleDialogOpen = (dialogType: string) => {
    setDialogOpen({ ...dialogOpen, [dialogType]: true })
  }

  // handle dialog close
  const handleDialogClose = (dialogType: string) => {
    setDialogOpen({ ...dialogOpen, [dialogType]: false })
  }

  if (userLoading || logoutLoading) return <Loader />

  return (
    <MiniVariantDrawer 
      name={userInfo ? `${userInfo?.first_name} ${userInfo?.last_name}` : 'Loading...'} 
      role={userInfo?.role}
      handleLogoutDialogOpen={() => handleDialogOpen('logout')}
    >
      <Stack p={3}>Official Receipts</Stack>
      <SystemDialog 
        open={dialogOpen.logout ?? false} 
        title="Logout" 
        dialogType="logout" 
        handleClose={() => handleDialogClose('logout')} 
        handleLogout={handleLogout} 
      />
    </MiniVariantDrawer>
  )
}

export default OfficialReceipt