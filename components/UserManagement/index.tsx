'use client'
import React, { useEffect, useState } from 'react'
import useAccessToken from '@/hooks/useAccessToken'
import useUserInfo from '@/hooks/useUserInfo'
import { Stack } from '@mui/material'
import MiniVariantDrawer from '@/components/Drawer/MiniVariantDrawer'
import Loader from '@/components/Loader'
import { IOpenDialog, ITabContents, OpenDialogType } from '@/Interfaces'
import CardContainer from '@/components/CardContainer'
import TabContainer, { CustomTabPanel } from '@/components/TabContainer'
import SystemDialog from '../SystemDialog'
import API from '@/utilities/API'
import toast from 'react-hot-toast'

const UserManagement = () => {
  const { accessToken, forceRelogin } = useAccessToken()
  const { userInfo, isAuthenticated, userLoading } = useUserInfo(
    accessToken ?? ''
  )
  const [loading, setLoading] = useState(true)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState<IOpenDialog>({})
  const [tabContents, setTabContents] = useState<ITabContents[]>([])

  // Handle global loading
  useEffect(() => {
    if (
      userLoading ||
      logoutLoading
    ) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [
    userLoading,
    logoutLoading
  ])

  useEffect(() => {
    setTabContents([
      {
        index: 0,
        label: 'USERS',
      }
    ])
  }, [])

  // Handle logout using API utilities
  const handleLogout = () => {
    setLogoutLoading(true)

    if (accessToken) {
      API.logout(accessToken).then((response) => {
        const res = response?.data.data

        if (res?.error) {
          toast.error(res?.message)
          setLogoutLoading(false)
          return
        }

        toast.success(res?.message)
        forceRelogin()
      })
    } else {
      forceRelogin()
      setLogoutLoading(false)
    }
  }

  // Handle dialog open
  const handleDialogOpen = (dialogType: OpenDialogType) => {
    setDialogOpen({ ...dialogOpen, [dialogType]: true })
  }

  // handle dialog close
  const handleDialogClose = (dialogType: OpenDialogType) => {
    setDialogOpen({ ...dialogOpen, [dialogType]: false })
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const dynamicTabContents = (index: number) => {
    if (index === 0) {
      return (
        <></>
      )
    }

    return <></>
  }

  return (
    <MiniVariantDrawer
      name={
        userInfo
          ? `${userInfo?.first_name} ${userInfo?.last_name}`
          : 'Loading...'
      }
      role={userInfo?.role}
      handleLogoutDialogOpen={() => handleDialogOpen('logout')}
    >
      {loading && <Loader />}
      <Stack p={2}>
        <CardContainer title='User Management'>
          <TabContainer
            tabs={tabContents}
            currentTab={tabValue}
            handleChange={handleTabChange}
          >
            {tabContents.map((content, index) => {
              return (
                <CustomTabPanel
                  key={content.index}
                  value={tabValue}
                  index={content.index}
                >
                  {content.index === tabValue &&
                    dynamicTabContents(content.index)}
                </CustomTabPanel>
              )
            })}
          </TabContainer>
        </CardContainer>
      </Stack>
      <SystemDialog
        open={dialogOpen.logout ?? false}
        title='Logout'
        dialogType='logout'
        handleClose={() => handleDialogClose('logout')}
        handleLogout={handleLogout}
      />
    </MiniVariantDrawer>
  )
}

export default UserManagement