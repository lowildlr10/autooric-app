'use client'
import React, { useEffect, useMemo, useState } from 'react'
import useAccessToken from '@/hooks/useAccessToken'
import useUserInfo from '@/hooks/useUserInfo'
import Loader from '../Loader'
import MiniVariantDrawer from '../Drawer/MiniVariantDrawer'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import { Stack } from '@mui/material'
import SystemDialog from '../SystemDialog'
import CardContainer from '../CardContainer'
import { IDiscount, IOfficialReceipt, IOpenDialog, IPaperSize, IParticular, IPayor, ITabContents, OpenDialogType } from '@/Interfaces'
import TabContainer, { CustomTabPanel } from '../TabContainer'
import CreateOr from './CreateOr'
import OrList from './OrList'
import { ToWords } from 'to-words'
import dayjs from 'dayjs'

const defaultCreateOrFormData: IOfficialReceipt = {
  receipt_date: dayjs().format('YYYY-MM-DD'),
  or_no: '',
  payor_id: '',
  nature_collection_id: '',
  discount_id: '',
  amount: 0,
  amount_words: '',
  payment_mode: '',
}

const defaultParticularFormData: IParticular = {
  particular_name: '',
  category_id: ''
}

const defaultDiscountFormData: IDiscount = {
  discount_name: '',
  percent: 0
}

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
  const [orListData, setOrListData] = useState<any>()
  const [paperSizes, setPaperSizes] = useState<IPaperSize[]>()
  const [paperSize, setPaperSize] = useState('')
  const [createOrFormData, setCreateOrFormData] = useState<IOfficialReceipt>(defaultCreateOrFormData)
  const [particularFormData, setParticularFormData] = useState<IParticular>(defaultParticularFormData)
  const [discountFormData, setDiscountFormData] = useState<IDiscount>(defaultDiscountFormData)
  const [printUrl, setPrintUrl] = useState('')
  const [changedAmountDiscount, setChangedAmountDiscount] = useState(false)

  // Discount computation with timeOut
  useEffect(() => {
    if (changedAmountDiscount && createOrFormData?.amount && createOrFormData?.discount_id) {
      const timer = setTimeout(() => {
        const discount = handleComputeDiscountedAmount(
          createOrFormData?.amount as number, createOrFormData?.discount_id as string
        )

        setCreateOrFormData({
          ...createOrFormData,
          amount: discount?.discountedAmount as number,
          amount_words: discount?.discountedAmountWords as string
        })

        setChangedAmountDiscount(false)
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      setChangedAmountDiscount(false)
    }
  }, [changedAmountDiscount, createOrFormData])

  useEffect(() => {
    if (!accessToken) return
    fetchPaperSizes()
  }, [accessToken])

  useEffect(() => {
    if (!accessToken || tabValue !== 1) return
    fetchOfficialReceipts()
  }, [accessToken, tabValue])

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
  }, [])

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

  const handlePageChange = (url: string) => {
    fetchOfficialReceipts(url)
  }

  const dynamicTabContents = (index: number) => {
    if (index === 0) return (
      <CreateOr 
        personelName={userInfo ? `${userInfo?.first_name} ${userInfo?.last_name}` : 'Loading...'}
        payors={payors ?? []} 
        particulars={particulars ?? []} 
        discounts={discounts ?? []} 
        formData={createOrFormData}
        computingDiscount={changedAmountDiscount}
        handleInputChange={(input_name, value) => handleInputChange(input_name, value)}
        handleCreate={(data, print) => handleCreateOr(data, print)}
        handlePrint={(orId, paperSizeId) => handlePrint(orId, paperSizeId)}
        handleClear={handleClear}
        fetchPayor={() => fetchPayors()}
        fetchParticular={() => fetchParticulars()}
        fetchDiscount={() => fetchDiscounts()}
        handleDialogOpen={(dialogType) => handleDialogOpen(dialogType)}
      />
    )

    if (index === 1) {
      const rows = orListData?.data?.map((or: any) => {
        return {
          id: or.id,
          receipt_date: dayjs(or.receipt_date).format('MM/DD/YYYY'),
          cancelled_date: dayjs(or.cancelled_date).format('MM/DD/YYYY'),
          deposited_date: dayjs(or.deposited_date).format('MM/DD/YYYY'),
          or_no: or.or_no,
          payor: or.payor.payor_name,
          nature_collection: or.nature_collection.particular_name,
          amount: or.amount.toFixed(2),
          amount_words: or.amount_words,
          discount: or?.discount?.discount_name ?? 'N/a',
          deposit: or.deposit,
          payment_mode: or.payment_mode,
          is_cancelled: or.is_cancelled,
          status: or.is_cancelled ? 'Cancelled' : 
            or.deposit ? 'Deposited' : 'Pending'
        }
      })
      const currentPage = orListData?.current_page
      const nextPageUrl = orListData?.next_page_url
      const prevPageUrl = orListData?.prev_page_url
      const from = orListData?.from
      const to = orListData?.to
      const total = orListData?.total
      const links = orListData?.links

      return (
        <OrList 
          personelName={userInfo ? `${userInfo?.first_name} ${userInfo?.last_name}` : 'Loading...'}
          rows={rows ?? []}
          currentPage={currentPage}
          nextPageUrl={nextPageUrl}
          prevPageUrl={prevPageUrl} 
          from={from}
          to={to}
          total={total}
          links={links}
          handlePageChange={handlePageChange}
        />
      )
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
  const fetchOfficialReceipts = (url?: string) => {
    setOrListLoading(true)
    if (accessToken) {
      const errorMessage = 'An error occurred while fetching official receipts. Please try again.'

      if (url) {
        API.getOfficialReceiptsByUrl(accessToken, url)
          .then((response) => {
            const res = response?.data.data
            setOrListData(res)
            setOrListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setOrListLoading(false)
          })
      } else {
        API.getOfficialReceipts(accessToken)
          .then((response) => {
            const res = response?.data.data
            setOrListData(res)
            setOrListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setOrListLoading(false)
          })
      }
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

  // Handle input changes
  const handleInputChange = (input_name: string, value: string | number | null) => {
    let amountWords = ''

    if (input_name === 'discount_id') setChangedAmountDiscount(true)
    if (input_name === 'amount') {
      setChangedAmountDiscount(true)
      try {
        amountWords = convertToWords(value as number ?? 0)

        if (!!value === false) amountWords = ''
      } catch (error) {
        amountWords = ''
      }
    
      setCreateOrFormData({ 
        ...createOrFormData, 
        amount: value as number, 
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
    setCreateOrFormData(defaultCreateOrFormData)
    setParticularFormData(defaultParticularFormData)
    setDiscountFormData(defaultDiscountFormData)
  }

  // Handle create official receipt
  const handleCreateOr = (formData: IOfficialReceipt, print = false) => {
    setFormSaveLoading(true)
    if (accessToken && changedAmountDiscount === false) {
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

          if (print) {
            handlePrint(res?.data?.id, paperSize)
          }

          setCreateOrFormData(defaultCreateOrFormData)
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res?.message ?? 'Unknown error occurred.')
          setFormSaveLoading(false)
        })
    } else {
      toast.error('Please wait for the discount computation to finish.')
      setFormSaveLoading(false)
    }
  }

  // Handle compute discounted amount from discounts with amount words
  const handleComputeDiscountedAmount = (amount: number, discount_id: string) => {
    // Find discount using discount id
    const selectedDiscount = discounts?.find(discount => discount.id === discount_id)
    
    if (!selectedDiscount) return
    
    const totalDiscount = amount * ((selectedDiscount?.percent ?? 0) / 100)
    const discountedAmount = amount - totalDiscount
    const discountedAmountWords = convertToWords(discountedAmount)

    return {
      discountedAmount: discountedAmount ?? 0,
      discountedAmountWords: discountedAmountWords ?? ''
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

          setParticularFormData(defaultParticularFormData)
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res.message)
          setFormSaveLoading(false)
        })
    } else {
      toast.error('An error occurred while creating particulars. Please try again.')
      setFormSaveLoading(false)
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

          setDiscountFormData(defaultDiscountFormData)
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res.message)
          setFormSaveLoading(false)
        })
    } else {
      toast.error('An error occurred while creating discounts. Please try again.')
      setFormSaveLoading(false)
    }
  }

  // Handle print official receipt
  const handlePrint = (orId: string, paperSizeId: string) => {
    if (accessToken) {
      API.getPrintableOR(accessToken, orId, paperSizeId)
        .then((response) => {
          setPrintUrl(`data:application/pdf;base64,${response.data.data.pdf}`)
          handleDialogOpen('print')
        })
        .catch((error) => {
          console.log(error.message)
        })
    } else {
      toast.error('An error occurred while fetching printable official receipt. Please try again.')
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
        handleClear={() => setParticularFormData(defaultParticularFormData)}
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
        handleClear={() => setDiscountFormData(defaultDiscountFormData)}
        handleCreate={handleCreateDiscount}
        handleInputChange={handleInputChangeDiscounts}
      />
    </MiniVariantDrawer>
  )
}

export default OfficialReceipt