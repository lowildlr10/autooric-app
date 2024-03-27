'use client'
import React, { useEffect, useState } from 'react'
import useAccessToken from '@/hooks/useAccessToken'
import useUserInfo from '@/hooks/useUserInfo'
import { CircularProgress, Stack } from '@mui/material'
import MiniVariantDrawer from '@/components/Drawer/MiniVariantDrawer'
import Loader from '@/components/Loader'
import { IOpenDialog, ITabContents, IUser, OpenDialogType } from '@/Interfaces'
import CardContainer from '@/components/CardContainer'
import TabContainer, { CustomTabPanel } from '@/components/TabContainer'
import SystemDialog from '../SystemDialog'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import UserList from './UserList'

const defaultUserFormData: IUser = {
  id: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  phone: '',
  position_id: '',
  designation_id: '',
  station_id: '',
  username: '',
  password: '',
  role: 'staff',
  is_active: false,
}

const UserManagement = () => {
  const { accessToken, forceRelogin } = useAccessToken()
  const { userInfo, isAuthenticated, userLoading } = useUserInfo(
    accessToken ?? ''
  )
  const [loading, setLoading] = useState(true)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [userListLoading, setUserListLoading] = useState(false)
  const [formSaveLoading, setFormSaveLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [userListData, setUserListData] = useState<any>()
  const [tabValue, setTabValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState<IOpenDialog>({})
  const [tabContents, setTabContents] = useState<ITabContents[]>([])
  const [userFormData, setUserFormData] = useState<IUser>(defaultUserFormData)

  // Handle global loading
  useEffect(() => {
    if (
      userLoading ||
      logoutLoading ||
      userListLoading ||
      formSaveLoading ||
      deleteLoading
    ) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [
    userLoading,
    logoutLoading,
    userListLoading,
    formSaveLoading,
    deleteLoading,
  ])

  // Check if user is already logged in
  useEffect(() => {
    if (loading) return
    if (!userLoading && !isAuthenticated) forceRelogin()
  }, [isAuthenticated, loading, userLoading])

  useEffect(() => {
    setTabContents([
      {
        index: 0,
        label: (
          <Stack direction='row'>
            USERS&nbsp;
            {loading && tabValue === 0 && (
              <CircularProgress size={16} color='primary' />
            )}
          </Stack>
        ),
      },
    ])
  }, [loading, tabValue])

  useEffect(() => {
    if (!accessToken) return
    switch (tabValue) {
      case 0:
        fetchUsers()
        break
      default:
        break
    }
  }, [accessToken, tabValue])

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

  // Fetch users
  const fetchUsers = (url?: string) => {
    setUserListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching official receipts. Please try again.'

      if (url) {
        API.getUsersByUrl(accessToken, url)
          .then((response) => {
            const res = response?.data.data
            setUserListData(res)
            setUserListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setUserListLoading(false)
          })
      } else {
        API.getUsers(accessToken)
          .then((response) => {
            const res = response?.data.data
            setUserListData(res)
            setUserListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setUserListLoading(false)
          })
      }
    }
  }

  const handlePageChange = (url: string) => {
    fetchUsers(url)
  }

  const handleShowDetails = (details: IUser) => {
    setUserFormData({
      ...userFormData,
      id: details.id,
      first_name: details.first_name,
      middle_name: details.middle_name,
      last_name: details.last_name,
      email: details.email,
      phone: details.phone,
      position_id: details.position_id,
      designation_id: details.designation_id,
      station_id: details.station_id,
      username: details.username,
      password: '',
      role: details.role,
      is_active: details.is_active,
    })
    handleDialogOpen('update_users')
  }

  const handleInputChangeUsers = (
    input_name: string,
    value: string | number | boolean | null
  ) => {
    setUserFormData({ ...userFormData, [input_name]: value })
  }

  // Handle create users
  const handleCreateUser = (formData: IUser) => {
    setFormSaveLoading(true)
    if (accessToken) {
      API.createUser(accessToken, formData)
        .then((response) => {
          const res = response?.data.data
          if (res?.error) {
            toast.error(res?.message)
            setFormSaveLoading(false)
            return
          }

          toast.success(res?.message)
          setFormSaveLoading(false)
          setUserFormData(defaultUserFormData)
          fetchUsers()
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res.message)
          setFormSaveLoading(false)
        })
    } else {
      toast.error('An error occurred while creating user. Please try again.')
      setFormSaveLoading(false)
    }
  }

  // Handle update users
  const handleUpdateUser = (formData: IUser) => {
    setFormSaveLoading(true)
    if (accessToken) {
      API.updateUser(accessToken, formData?.id ?? '', formData)
        .then((response) => {
          const res = response?.data.data
          if (res?.error) {
            toast.error(res?.message)
            setFormSaveLoading(false)
            return
          }

          toast.success(res?.message)
          setFormSaveLoading(false)
          setUserFormData(defaultUserFormData)
          fetchUsers()
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res.message)
          setFormSaveLoading(false)
        })
    } else {
      toast.error('An error occurred while updating a user. Please try again.')
      setFormSaveLoading(false)
    }
  }

  const handleDeleteUser = (id: string) => {
    setDeleteLoading(true)

    if (accessToken && id) {
      API.deleteUser(accessToken, id)
        .then((response) => {
          const res = response?.data.data
          if (res?.error) {
            toast.error(res?.message)
            setDeleteLoading(false)
            return
          }

          toast.success(res?.message)
          setDeleteLoading(false)
          setUserFormData(defaultUserFormData)
          setDialogOpen({
            create_users: false,
            update_users: false,
            delete_users: false,
          })
          fetchUsers()
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res.message)
          setDeleteLoading(false)
        })
    } else {
      toast.error('An error occurred while deleting a user. Please try again.')
      setDeleteLoading(false)
    }
  }

  const dynamicTabContents = (index: number) => {
    if (index === 0) {
      const rows = userListData?.data?.map((user: any) => {
        return {
          id: user.id,
          fullname:
            user.first_name +
            `${user.middle_name ? ` ${user.middle_name[0]}. ` : ' '}` +
            user.last_name,
          first_name: user.first_name,
          middle_name: user.middle_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          phone_str: user.phone ?? 'N/a',
          position: user.position.position_name,
          position_id: user.position.id,
          designation: user.designation.designation_name,
          designation_id: user.designation.id,
          station: user.station.station_name,
          station_id: user.station.id,
          role: user.role,
          is_active: user.is_active,
          username: user.username,
          role_str: user.role === 'admin' ? 'Admin' : 'Staff',
          status: user.is_active ? 'Active' : 'Inactive',
        }
      })
      const currentPage = userListData?.current_page
      const nextPageUrl = userListData?.next_page_url
      const prevPageUrl = userListData?.prev_page_url
      const from = userListData?.from
      const to = userListData?.to
      const total = userListData?.total
      const links = userListData?.links

      return (
        <UserList
          rows={rows ?? []}
          currentPage={currentPage}
          nextPageUrl={nextPageUrl}
          prevPageUrl={prevPageUrl}
          from={from}
          to={to}
          total={total}
          links={links}
          handlePageChange={handlePageChange}
          handleShowDetails={handleShowDetails}
          handleShowCreate={() => handleDialogOpen('create_users')}
        />
      )
    }
  }

  return (
    <MiniVariantDrawer
      name={
        userInfo ? (
          `${userInfo?.first_name} ${userInfo?.last_name}`
        ) : (
          <CircularProgress size={20} color='inherit' />
        )
      }
      role={userInfo?.role}
      handleLogoutDialogOpen={() => handleDialogOpen('logout')}
    >
      {/* {loading && <Loader />} */}
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
      <SystemDialog
        open={dialogOpen.create_users ?? false}
        title='Create User'
        dialogType='create'
        content='users'
        formData={userFormData}
        handleInputChange={handleInputChangeUsers}
        handleClose={() => handleDialogClose('create_users')}
        handleClear={() => setUserFormData(defaultUserFormData)}
        handleCreate={handleCreateUser}
      />
      <SystemDialog
        open={dialogOpen.update_users ?? false}
        title={`User Details (${userFormData?.first_name})`}
        dialogType='update'
        content='users'
        id={userFormData?.id}
        formData={userFormData}
        handleInputChange={handleInputChangeUsers}
        handleClose={() => handleDialogClose('update_users')}
        handleClear={() => setUserFormData(defaultUserFormData)}
        handleUpdate={handleUpdateUser}
        handleShowDelete={() => handleDialogOpen('delete_users')}
      />
      <SystemDialog
        open={dialogOpen.delete_users ?? false}
        title={`Delete User ${userFormData?.first_name}?`}
        dialogType='delete'
        id={userFormData?.id}
        handleClose={() => handleDialogClose('delete_users')}
        handleDelete={handleDeleteUser}
      />
    </MiniVariantDrawer>
  )
}

export default UserManagement
