'use client'
import React, { useEffect, useState } from 'react'
import useAccessToken from '@/hooks/useAccessToken'
import useUserInfo from '@/hooks/useUserInfo'
import { Stack } from '@mui/material'
import MiniVariantDrawer from '@/components/Drawer/MiniVariantDrawer'
import Loader from '@/components/Loader'
import { IOpenDialog, ITabContents, ICategories, IParticular, OpenDialogType, IDiscount, IPaperSize } from '@/Interfaces'
import CardContainer from '@/components/CardContainer'
import TabContainer, { CustomTabPanel } from '@/components/TabContainer'
import SystemDialog from '../SystemDialog'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import CategoryList from './Categories/CategoryList'
import ParticularList from './Particulars/ParticularList'
import DiscountList from './Discounts/DiscountList'
import PaperSizeList from './PaperSizes/PaperSizeList'

const defaultCateogryFormData: ICategories = {
  id: '',
  category_name: '',
  order_no: 0
}

const defaultParticularFormData: IParticular = {
  id: '',
  category_id: '',
  category_str: '',
  particular_name: '',
  default_amount: 0,
  default_amount_str: '',
  order_no: 0
}

const defaultDiscountFormData: IDiscount = {
  id: '',
  discount_name: '',
  percent: 0,
  percent_str: '',
  requires_card_no: false,
  requires_card_no_str: '',
  status: ''
}

const defaultPaperSizeFormData: IPaperSize = {
  id: '',
  paper_name: '',
  width: 0,
  height: 0
}

const Library = () => {
  const { accessToken, forceRelogin } = useAccessToken()
  const { userInfo, isAuthenticated, userLoading } = useUserInfo(
    accessToken ?? ''
  )
  const [loading, setLoading] = useState(true)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [categoryListLoading, setCategoryListLoading] = useState(false)
  const [particularListLoading, setParticularListLoading] = useState(false)
  const [discountListLoading, setDiscountListLoading] = useState(false)
  const [paperSizeListLoading, setPaperSizeListLoading] = useState(false)
  const [formSaveLoading, setFormSaveLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [categoryListData, setCategoryListData] = useState<any>()
  const [particularListData, setParticularListData] = useState<any>()
  const [discountListData, setDiscountListData] = useState<any>()
  const [paperSizeListData, setPaperSizeListData] = useState<any>()
  const [tabValue, setTabValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState<IOpenDialog>({})
  const [tabContents, setTabContents] = useState<ITabContents[]>([])
  const [categoryFormData, setCategoryFormData] = useState<ICategories>(
    defaultCateogryFormData
  )
  const [particularFormData, setParticularFormData] = useState<IParticular>(
    defaultParticularFormData
  )
  const [discountFormData, setDiscountFormData] = useState<IDiscount>(
    defaultDiscountFormData
  )
  const [paperSizeFormData, setPaperSizeFormData] = useState<IPaperSize>(
    defaultPaperSizeFormData
  )

  // Handle global loading
  useEffect(() => {
    if (
      userLoading ||
      logoutLoading ||
      categoryListLoading ||
      particularListLoading ||
      discountListLoading ||
      paperSizeListLoading ||
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
    categoryListLoading,
    particularListLoading,
    discountListLoading,
    paperSizeListLoading,
    formSaveLoading,
    deleteLoading
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
        label: 'CATEGORIES',
      },
      {
        index: 1,
        label: 'PARTICULARS',
      },
      {
        index: 2,
        label: 'DISCOUNTS',
      },
      {
        index: 3,
        label: 'SIGNATORIES',
      },
      {
        index: 4,
        label: 'PAPER SIZES',
      }
    ])
  }, [])

  useEffect(() => {
    if (!accessToken) return
    switch (tabValue) {
      case 0:
        fetchCategories()   
        break
      case 1:
        fetchParticulars()   
        break
      case 2:
        fetchDiscounts()
      case 4:
        fetchPaperSizes()
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
  
  // Fetch categories
  const fetchCategories = (url?: string) => {
    setCategoryListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching lists. Please try again.'

      if (url) {
        API.getCategoriesByUrl(accessToken, url)
          .then((response) => {
            const res = response?.data.data
            setCategoryListData(res)
            setCategoryListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setCategoryListLoading(false)
          })
      } else {
        API.getPaginatedCategories(accessToken)
          .then((response) => {
            const res = response?.data.data
            setCategoryListData(res)
            setCategoryListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setCategoryListLoading(false)
          })
      }
    }
  }

  // Fetch particulars
  const fetchParticulars = (url?: string) => {
    setParticularListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching lists. Please try again.'

      if (url) {
        API.getParticularsByUrl(accessToken, url)
          .then((response) => {
            const res = response?.data.data
            setParticularListData(res)
            setParticularListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setParticularListLoading(false)
          })
      } else {
        API.getPaginatedParticulars(accessToken)
          .then((response) => {
            const res = response?.data.data
            setParticularListData(res)
            setParticularListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setParticularListLoading(false)
          })
      }
    }
  }

  // Fetch discounts
  const fetchDiscounts = (url?: string) => {
    setDiscountListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching lists. Please try again.'

      if (url) {
        API.getDiscountsByUrl(accessToken, url)
          .then((response) => {
            const res = response?.data.data
            setDiscountListData(res)
            setDiscountListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setDiscountListLoading(false)
          })
      } else {
        API.getPaginatedDiscounts(accessToken)
          .then((response) => {
            const res = response?.data.data
            setDiscountListData(res)
            setDiscountListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setDiscountListLoading(false)
          })
      }
    }
  }

  // Fetch paper sizes
  const fetchPaperSizes = (url?: string) => {
    setPaperSizeListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching lists. Please try again.'

      if (url) {
        API.getPaperSizesByUrl(accessToken, url)
          .then((response) => {
            const res = response?.data.data
            setPaperSizeListData(res)
            setPaperSizeListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setPaperSizeListLoading(false)
          })
      } else {
        API.getPaginatedPaperSizes(accessToken)
          .then((response) => {
            const res = response?.data.data
            setPaperSizeListData(res)
            setPaperSizeListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setPaperSizeListLoading(false)
          })
      }
    }
  }

  const handlePageChange = (url: string) => {
    switch (tabValue) {
      case 0:
        fetchCategories(url)   
        break
      case 1:
        fetchParticulars(url)
      case 2:
        fetchDiscounts(url)
      case 4:
        fetchPaperSizes(url)
      default:
        break
    }
  }

  const handleShowDetails = (details: any) => {
    switch (tabValue) {
      case 0:
        setCategoryFormData({
          ...categoryFormData,
          id: details.id,
          category_name: details.category_name,
          order_no: details.order_no
        })
        handleDialogOpen('update_categories') 
        break
      default:
        break
    }
  }

  const handleInputChangeCategories = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryFormData({ ...particularFormData, [e.target.name]: e.target.value })
  }

  const handleInputChangeParticulars = (
    input_name: string,
    value: string | number | boolean | null
  ) => {
    setParticularFormData({ ...particularFormData, [input_name]: value })
  }

  const handleInputChangeDiscounts = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const elemName = e.target.name

    if (elemName === 'requires_card_no') {
      setDiscountFormData({
        ...discountFormData,
        requires_card_no: e.target.checked,
      })
      return
    }

    setDiscountFormData({
      ...discountFormData,
      [elemName]: e.target.value,
    })
  }
  
  // Handle create users
  // const handleCreateUser = (formData: IUser) => {
  //   setFormSaveLoading(true)
  //   if (accessToken) {
  //     API.createUser(accessToken, formData)
  //       .then((response) => {
  //         const res = response?.data.data
  //         if (res?.error) {
  //           toast.error(res?.message)
  //           setFormSaveLoading(false)
  //           return
  //         }

  //         toast.success(res?.message)
  //         setFormSaveLoading(false)
  //         setUserFormData(defaultUserFormData)
  //         fetchUsers()
  //       })
  //       .catch((error) => {
  //         const res = error?.response?.data.data
  //         toast.error(res.message)
  //         setFormSaveLoading(false)
  //       })
  //   } else {
  //     toast.error(
  //       'An error occurred while creating user. Please try again.'
  //     )
  //     setFormSaveLoading(false)
  //   }
  // }

  // Handle create users
  // const handleUpdateUser = (formData: IUser) => {
  //   setFormSaveLoading(true)
  //   if (accessToken) {
  //     API.updateUser(accessToken, formData?.id ?? '', formData)
  //       .then((response) => {
  //         const res = response?.data.data
  //         if (res?.error) {
  //           toast.error(res?.message)
  //           setFormSaveLoading(false)
  //           return
  //         }

  //         toast.success(res?.message)
  //         setFormSaveLoading(false)
  //         setUserFormData(defaultUserFormData)
  //         fetchUsers()
  //       })
  //       .catch((error) => {
  //         const res = error?.response?.data.data
  //         toast.error(res.message)
  //         setFormSaveLoading(false)
  //       })
  //   } else {
  //     toast.error(
  //       'An error occurred while creating user. Please try again.'
  //     )
  //     setFormSaveLoading(false)
  //   }
  // }

  // const handleDeleteUser = (id: string) => {
  //   setDeleteLoading(true)

  //   if (accessToken && id) {
  //     API.deleteUser(accessToken, id)
  //       .then((response) => {
  //         const res = response?.data.data
  //         if (res?.error) {
  //           toast.error(res?.message)
  //           setDeleteLoading(false)
  //           return
  //         }

  //         toast.success(res?.message)
  //         setDeleteLoading(false)
  //         setUserFormData(defaultUserFormData)
  //         setDialogOpen({
  //           create_users: false,
  //           update_users: false,
  //           delete_users: false
  //         })
  //         fetchUsers()
  //       })
  //       .catch((error) => {
  //         const res = error?.response?.data.data
  //         toast.error(res.message)
  //         setDeleteLoading(false)
  //       })
  //   } else {
  //     toast.error(
  //       'An error occurred while creating user. Please try again.'
  //     )
  //     setDeleteLoading(false)
  //   }
  // }

  const dynamicTabContents = (index: number) => {
    if (index === 0) {
      const rows = categoryListData?.data?.map((category: any) => {
        return {
          id: category?.id,
          category_name: category?.category_name,
          order_no: category?.order_no
        }
      })
      const currentPage = categoryListData?.current_page
      const nextPageUrl = categoryListData?.next_page_url
      const prevPageUrl = categoryListData?.prev_page_url
      const from = categoryListData?.from
      const to = categoryListData?.to
      const total = categoryListData?.total
      const links = categoryListData?.links

      return (
        <CategoryList
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
    } else if (index === 1) {
      const rows: any = [] 
      particularListData?.data?.forEach((category: any) => {
        rows.push({
          id: `${category?.id}`,
          particular_name: `---- Category Group: ${category?.category_name} ----`,
          category_str: '',
          default_amount_str: '',
          order_no: ''
        })
        category?.particulars?.forEach((particular: any) => {
          rows.push({
            id: particular?.id,
            particular_name: particular?.particular_name,
            category_str: category?.category_name,
            default_amount_str: particular?.default_amount ? 
              particular.default_amount
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 'N/a',
            order_no: particular.order_no
          })
        })
      })
      const currentPage = particularListData?.current_page
      const nextPageUrl = particularListData?.next_page_url
      const prevPageUrl = particularListData?.prev_page_url
      const from = particularListData?.from
      const to = particularListData?.to
      const total = particularListData?.total
      const links = particularListData?.links

      return (
        <ParticularList
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
    } else if (index === 2) {
      const rows = discountListData?.data?.map((discount: any) => {
        return {
          id: discount?.id,
          discount_name: discount?.discount_name,
          percent_str: `${String(discount?.percent.toFixed(2))}%`,
          requires_card_no_str: discount?.requires_card_no ? 'Yes' : 'No',
          status: discount?.is_active ? 'Active' : 'Inactive'
        }
      })
      const currentPage = discountListData?.current_page
      const nextPageUrl = discountListData?.next_page_url
      const prevPageUrl = discountListData?.prev_page_url
      const from = discountListData?.from
      const to = discountListData?.to
      const total = discountListData?.total
      const links = discountListData?.links

      return (
        <DiscountList
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
    } else if (index === 4) {
      const rows = paperSizeListData?.data?.map((paper: any) => {
        return {
          id: paper.id,
          paper_name: paper?.paper_name,
          width: paper?.width,
          height: paper?.height,
          width_str: `${String(paper.width.toFixed(2))}"`,
          height_str: `${String(paper.height.toFixed(2))}"`,
        }
      })
      const currentPage = paperSizeListData?.current_page
      const nextPageUrl = paperSizeListData?.next_page_url
      const prevPageUrl = paperSizeListData?.prev_page_url
      const from = paperSizeListData?.from
      const to = paperSizeListData?.to
      const total = paperSizeListData?.total
      const links = paperSizeListData?.links

      return (
        <PaperSizeList
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
        userInfo
          ? `${userInfo?.first_name} ${userInfo?.last_name}`
          : 'Loading...'
      }
      role={userInfo?.role}
      handleLogoutDialogOpen={() => handleDialogOpen('logout')}
    >
      {loading && <Loader />}
      <Stack p={2}>
        <CardContainer title='Library'>
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
      {/* <SystemDialog
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
      /> */}
    </MiniVariantDrawer>
  )
}

export default Library