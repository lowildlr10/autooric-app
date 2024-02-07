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
import CardContainer from '../CardContainer'
import { IDiscount, IOfficialReceipt, IOfficialReceiptProps, IOpenDialog, IPaperSize, IParticular, IPayor, ITabContents, ITabPanelProps } from '@/Interfaces'
import TabContainer, { CustomTabPanel } from '../TabContainer'
import CreateOr from './CreateOr'
import OrList from './OrList'

const OfficialReceipt = () => {
  const { accessToken, forceRelogin } = useAccessToken()
  const { userInfo, isAuthenticated, userLoading } = useUserInfo(accessToken ?? '')
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [payorLoading, setPayorLoading] = useState(false)
  const [particularLoading, setParticularLoading] = useState(false)
  const [discountLoading, setDiscountLoading] = useState(false)
  const [orListLoading, setOrListLoading] = useState(false)
  const [paperSizeLoading, setPaperSizeLoading] = useState(false)
  const [formSaveLoading, setFormSaveLoading] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState<IOpenDialog>({
    logout: false
  })
  const [tabContents, setTabContents] = useState<ITabContents[]>([])
  const [payors, setPayors] = useState<IPayor[]>()
  const [discounts, setDiscounts] = useState<IDiscount[]>()
  const [particulars, setParticulars] = useState<IParticular[]>()
  const [orList, setOrList] = useState<IOfficialReceipt[]>()
  const [paperSizes, setPaperSizes] = useState<IPaperSize[]>()
  const [paperSize, setPaperSize] = useState('')
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    console.log('formData', formData)
  }, [formData])

  useEffect(() => {
    handleResync()
  }, [accessToken])

  useEffect(() => {
    setTabContents([
      {
        index: 0,
        label: 'CREATE/ISSUE OR',
        component: <CreateOr 
          payors={payors ?? []} 
          particulars={particulars ?? []} 
          discounts={discounts ?? []} 
          paperSizes={paperSizes ?? []}
          formData={formData}
          handleInputChange={(input_name, value) => handleInputChange(input_name, value)}
          handleCreate={(data, print) => handleCreate(data, print)}
          handlePrint={(orId, paperSizeId) => handlePrint(orId, paperSizeId)}
          handleClear={handleClear}
          handlePaperSizeChange={handlePaperSizeChange}
        />
      },
      {
        index: 1,
        label: 'OR LIST',
        component: <OrList />
      }
    ])
  }, [payors, particulars, discounts, orList])

  // Handle global loading
  useEffect(() => {
    if (
      userLoading || payorLoading || particularLoading || discountLoading || 
      orListLoading || paperSizeLoading || logoutLoading
    ) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [userLoading, payorLoading, particularLoading, discountLoading, orListLoading])
  
  // Check if user is already logged in
  useEffect(() => {
    if (loading) return
    if (!userLoading && !isAuthenticated) forceRelogin()
  }, [isAuthenticated, loading, userLoading])

  const fetchPayors = () => {
    setPayorLoading(true)
    if (accessToken) {
      API.getPayors(accessToken)
        .then((response) => {
          const res = response?.data.data
          setPayors(res)
          setPayorLoading(false)
        })
        .catch((error) => {
          toast.error('An error occurred while fetching payors. Please try again.')
          setPayorLoading(false)
        })
    }
  }

  // Fetch discounts
  const fetchDiscounts = () => {
    setDiscountLoading(true)
    if (accessToken) {
      API.getDiscounts(accessToken)
        .then((response) => {
          const res = response?.data.data
          setDiscounts(res)
          setDiscountLoading(false)
        })
        .catch((error) => {
          toast.error('An error occurred while fetching discounts. Please try again.')
          setDiscountLoading(false)
        })
    }
  }

  // Fetch particulars
  const fetchParticulars = () => {
    setParticularLoading(true)
    if (accessToken) {
      API.getParticulars(accessToken)
        .then((response) => {
          const res = response?.data.data
          setParticulars(res)
          setParticularLoading(false)
        })
        .catch((error) => {
          toast.error('An error occurred while fetching particulars. Please try again.')
          setParticularLoading(false)
        })
    }
  }

  // Fetch official receipts
  const fetchOfficialReceipts = () => {
    setOrListLoading(true)
    if (accessToken) {
      API.getOfficialReceipts(accessToken)
        .then((response) => {
          const res = response?.data.data
          setOrList(res)
          setOrListLoading(false)
        })
        .catch((error) => {
          toast.error('An error occurred while fetching official receipts. Please try again.')
          setOrListLoading(false)
        })
    }
  }

  // Fetch paper sizes
  const fetchPaperSizes = () => {
    setPaperSizeLoading(true)
    if (accessToken) {
      API.getPaperSizes(accessToken)
        .then((response) => {
          const res = response?.data.data
          setPaperSizes(res)
          setPaperSizeLoading(false)
        })
        .catch((error) => {
          toast.error('An error occurred while fetching paper sizes. Please try again.')
          setPaperSizeLoading(false)
        })
    }
  }

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Handle textfield changes
  const handleInputChange = (input_name: string, value: string | number | null) => {
    setFormData({ ...formData, [input_name]: value })
  }

  const handlePaperSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaperSize(e.target.value)
  }

  // Handle clear form
  const handleClear = () => {
    setFormData({})
  }

  // Handle resync all data
  const handleResync = () => {
    fetchPayors()
    fetchDiscounts()
    fetchParticulars()
    fetchOfficialReceipts()
    fetchPaperSizes()
  }

  // Handle create official receipt
  const handleCreate = (formData: IOfficialReceipt, print = false) => {
    setFormSaveLoading(true)
    if (accessToken) {
      API.createOfficialReceipt(accessToken, formData)
        .then((response) => {
          const res = response?.data.data
          if (res?.error) {
            toast.error(res?.message)
            setFormSaveLoading(false)
            return
          }

          toast.success(res?.message)
          setFormSaveLoading(false)
          handleResync()

          if (print) {
            handlePrint(res?.or_id, paperSize)
          }
        })
        .catch((error) => {
          toast.error('An error occurred while creating official receipt. Please try again.')
          setFormSaveLoading(false)
        })
    }
  }

  // Handle print official receipt
  const handlePrint = (orId: string, paperSizeId: string) => {
    if (accessToken) {
      API.getPrintableOR(accessToken, orId, paperSizeId)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          toast.error('An error occurred while printing official receipt. Please try again.')
        })
    }
  }

  return (
    <MiniVariantDrawer 
      name={userInfo ? `${userInfo?.first_name} ${userInfo?.last_name}` : 'Loading...'} 
      role={userInfo?.role}
      handleLogoutDialogOpen={() => handleDialogOpen('logout')}
    >
      {loading && <Loader />}
      <Stack p={2}>
        <CardContainer title="Official Receipt">
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
                  {content.index === tabValue && content.component}
                </CustomTabPanel>
              )
            })}
          </TabContainer>
        </CardContainer>
      </Stack>
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