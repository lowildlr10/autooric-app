'use client'
import React, { useEffect, useState } from 'react'
import useAccessToken from '@/hooks/useAccessToken'
import useUserInfo from '@/hooks/useUserInfo'
import Loader from '../Loader'
import MiniVariantDrawer from '../Drawer/MiniVariantDrawer'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import { SelectChangeEvent, Stack } from '@mui/material'
import SystemDialog from '../SystemDialog'
import CardContainer from '../CardContainer'
import { IDiscount, IOfficialReceipt, IOpenDialog, IPaperSize, IParticular, IPayor, ITabContents, ITabPanelProps, OpenDialogType } from '@/Interfaces'
import TabContainer, { CustomTabPanel } from '../TabContainer'
import CreateOr from './CreateOr'
import OrList from './OrList'
import { ToWords } from 'to-words'

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
  const [dialogOpen, setDialogOpen] = useState<IOpenDialog>({})
  const [tabContents, setTabContents] = useState<ITabContents[]>([])
  const [payors, setPayors] = useState<IPayor[]>()
  const [discounts, setDiscounts] = useState<IDiscount[]>()
  const [particulars, setParticulars] = useState<IParticular[]>()
  const [orList, setOrList] = useState<IOfficialReceipt[]>()
  const [paperSizes, setPaperSizes] = useState<IPaperSize[]>()
  const [paperSize, setPaperSize] = useState('')
  const [createOrFormData, setCreateOrFormData] = useState<IOfficialReceipt>({})
  const [particularFormData, setParticularFormData] = useState<IParticular>({})
  const [discountFormData, setDiscountFormData] = useState<IDiscount>({})
  const [printUrl, setPrintUrl] = useState('')

  useEffect(() => {
    console.log(createOrFormData)
  }, [createOrFormData])

  useEffect(() => {
    handleResync()
  }, [accessToken])

  useEffect(() => {
    setTabContents([
      {
        index: 0,
        label: 'CREATE/ISSUE OR'
      },
      {
        index: 1,
        label: 'OR LIST'
      }
    ])
  }, [payors, particulars, discounts, orList])

  // Set default paper size
  useEffect(() => {
    if (paperSizes) {
      const defaultPaperSize = paperSizes.find(paper => paper.paper_name === 'Official Receipt')
      setPaperSize(defaultPaperSize?.id ?? '')
    }
  }, [paperSizes])

  // Handle global loading
  useEffect(() => {
    if (
      userLoading || payorLoading || particularLoading || discountLoading || 
      orListLoading || paperSizeLoading || logoutLoading || formSaveLoading
    ) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [
    userLoading, payorLoading, particularLoading, discountLoading, 
    orListLoading, paperSizeLoading, logoutLoading, formSaveLoading
  ])
  
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

  const dynamicTabContents = (index: number) => {
    if (index === 0) return (
      <CreateOr 
        personelName={userInfo ? `${userInfo?.first_name} ${userInfo?.last_name}` : 'Loading...'}
        payors={payors ?? []} 
        particulars={particulars ?? []} 
        discounts={discounts ?? []} 
        formData={createOrFormData}
        handleInputChange={(input_name, value) => handleInputChange(input_name, value)}
        handleCreate={(data, print) => handleCreateOr(data, print)}
        handlePrint={(orId, paperSizeId) => handlePrint(orId, paperSizeId)}
        handleClear={handleClear}
        handleResync={handleResync}
        handleDialogOpen={(dialogType) => handleDialogOpen(dialogType)}
      />
    )

    if (index === 1) return (
      <OrList />
    )
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

  // // Handle input changes
  const handleInputChange = (input_name: string, value: string | number | null) => {
    let amountWords = ''
    if (input_name === 'amount') {
      try {
        amountWords = convertToWords(value as number)
      } catch (error) {}
    }

    if (amountWords) {
      setCreateOrFormData({ 
        ...createOrFormData, 
        [input_name]: value, 
        amount_words: amountWords
      })
    } else {
      setCreateOrFormData({ ...createOrFormData, [input_name]: value }) 
    }
  }

  const handleInputChangeParticulars = (input_name: string, value: string | number | null) => {
    setParticularFormData({ ...particularFormData, [input_name]: value })
  }

  const handleInputChangeDiscounts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountFormData({ ...discountFormData, [e.target.name]: e.target.value })
  }

  // Handle clear form
  const handleClear = () => {
    setCreateOrFormData({})
    setParticularFormData({})
    setDiscountFormData({})
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
  const handleCreateOr = (formData: IOfficialReceipt, print = false) => {
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
          fetchOfficialReceipts()

          if (print) {
            handlePrint(res?.data?.id, paperSize)
          }
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res?.message ?? 'Unknown error occurred.')
          setFormSaveLoading(false)
        })

      //handleClear()  
    }
  }

  // Handle create particulars
  const handleCreateParticulars = (formData: IParticular) => {
    setFormSaveLoading(true)
    if (accessToken) {
      API.createParticulars(accessToken, formData)
        .then((response) => {
          const res = response?.data.data
          if (res?.error) {
            toast.error(res?.message)
            setFormSaveLoading(false)
            return
          }

          toast.success(res?.message)
          setFormSaveLoading(false)
          fetchParticulars()
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res.message)
          setFormSaveLoading(false)
        })

      handleClear()
    }
  }

  // Handle create discounts
  const handleCreateDiscount = (formData: IDiscount) => {
    setFormSaveLoading(true)
    if (accessToken) {
      API.createDiscount(accessToken, formData)
        .then((response) => {
          const res = response?.data.data
          if (res?.error) {
            toast.error(res?.message)
            setFormSaveLoading(false)
            return
          }

          toast.success(res?.message)
          setFormSaveLoading(false)
          fetchDiscounts()
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res.message)
          setFormSaveLoading(false)
        })

      handleClear()
    }
  }

  // Handle print official receipt
  const handlePrint = (orId: string, paperSizeId: string) => {
    if (accessToken) {
      API.getPrintableOR(accessToken, orId, paperSizeId)
        .then((response) => {
          console.log(response.data.data.pdf)
          setPrintUrl(`data:application/pdf;base64,${response.data.data.pdf}`)
          handleDialogOpen('print')

          // const res = response?.data.data
          // if (res?.error) {
          //   toast.error(res?.message)
          //   return
          // }

          // toast.success(res?.message)
          // const win = window.open(res?.url, '_blank')
          // win?.focus()
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }

  // Convert to to words
  const convertToWords = (amount: number) => {
    const toWords = new ToWords({
      localeCode: 'en-PH'
    })
    return toWords.convert(amount, { 
      currency: true,
    })
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
                  {content.index === tabValue && dynamicTabContents(content.index)}
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
      <SystemDialog 
        open={dialogOpen.print ?? false} 
        title="Print Official Receipt" 
        dialogType="print" 
        printUrl={printUrl}
        handleClose={() => handleDialogClose('print')}
      />
      <SystemDialog 
        open={dialogOpen.create_particulars ?? false} 
        title="Create Particular" 
        dialogType="create"
        content="particulars"
        formData={particularFormData} 
        handleClose={() => handleDialogClose('create_particulars')} 
        handleClear={handleClear}
        handleCreate={handleCreateParticulars}
        handleInputChange={handleInputChangeParticulars}
      />
      <SystemDialog 
        open={dialogOpen.create_discounts ?? false} 
        title="Create Discount" 
        dialogType="create"
        content="discounts" 
        formData={discountFormData}
        handleClose={() => handleDialogClose('create_discounts')} 
        handleClear={handleClear}
        handleCreate={handleCreateDiscount}
        handleInputChange={handleInputChangeDiscounts}
      />
    </MiniVariantDrawer>
  )
}

export default OfficialReceipt