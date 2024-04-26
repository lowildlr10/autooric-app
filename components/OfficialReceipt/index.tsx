'use client'
import React, { useEffect, useState } from 'react'
import useAccessToken from '@/hooks/useAccessToken'
import useUserInfo from '@/hooks/useUserInfo'
import Loader from '../Loader'
import MiniVariantDrawer from '../Drawer/MiniVariantDrawer'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import { CircularProgress, Stack } from '@mui/material'
import SystemDialog from '../SystemDialog'
import CardContainer from '../CardContainer'
import {
  IDeposit,
  IDiscount,
  IOfficialReceipt,
  IOpenDialog,
  IPaperSize,
  IParticular,
  IPayor,
  ITabContents,
  OpenDialogType,
  OrDuplicateStatus,
} from '@/Interfaces'
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
  card_no: '',
  amount_words: '',
  payment_mode: '',
  updated_at: undefined,
}

const defaultParticularFormData: IParticular = {
  particular_name: '',
  category_id: '',
  account_id: '',
  default_amount: 0,
  coa_accounting: false,
  pnp_crame: false,
  firearms_registration: false,
}

const defaultDiscountFormData: IDiscount = {
  discount_name: '',
  percent: 0,
  requires_card_no: false,
}

const defaultDepositFormData: IDeposit = {
  id: '',
  deposited_date: dayjs().format('YYYY-MM-DD'),
  deposit: 0,
  has_discount: false,
  card_no: '',
  regular: 0,
  discounted: 0,
}

const OfficialReceipt = () => {
  const { accessToken, forceRelogin } = useAccessToken()
  const { userInfo, isAuthenticated, userLoading } = useUserInfo(
    accessToken ?? ''
  )
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [payorLoading, setPayorLoading] = useState(false)
  const [particularLoading, setParticularLoading] = useState(false)
  const [discountLoading, setDiscountLoading] = useState(false)
  const [orListLoading, setOrListLoading] = useState(false)
  const [paperSizeLoading, setPaperSizeLoading] = useState(false)
  const [checkOrDuplicateLoading, setCheckOrDuplicateLoading] = useState(false)
  const [formSaveLoading, setFormSaveLoading] = useState(false)
  const [printDownloadLoading, setPrintDownloadLoading] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState<IOpenDialog>({})
  const [tabContents, setTabContents] = useState<ITabContents[]>([])
  const [payors, setPayors] = useState<IPayor[]>()
  const [discounts, setDiscounts] = useState<IDiscount[]>()
  const [particulars, setParticulars] = useState<IParticular[]>()
  const [orListData, setOrListData] = useState<any>()
  const [paperSizes, setPaperSizes] = useState<IPaperSize[]>()
  const [paperSize, setPaperSize] = useState('')
  const [enableUpdate, setEnableUpdate] = useState(false)
  const [createOrFormData, setCreateOrFormData] = useState<IOfficialReceipt>(
    defaultCreateOrFormData
  )
  const [particularFormData, setParticularFormData] = useState<IParticular>(
    defaultParticularFormData
  )
  const [discountFormData, setDiscountFormData] = useState<IDiscount>(
    defaultDiscountFormData
  )
  const [depositFormData, setDepositFormData] = useState<IDeposit>(
    defaultDepositFormData
  )
  const [printUrl, setPrintUrl] = useState('')
  const [changedAmountDiscount, setChangedAmountDiscount] = useState(false)
  const [details, setDetails] = useState<IOfficialReceipt | undefined>({})
  const [showDetails, setShowDetails] = useState(false)
  const [tempPrintId, setTempPrintId] = useState('')
  const [checkOrDuplicateStatus, setCheckOrDuplicateStatus] =
    useState<OrDuplicateStatus>('')

  // Discount computation with timeOut
  useEffect(() => {
    if (
      changedAmountDiscount &&
      createOrFormData?.amount &&
      createOrFormData?.discount_id
    ) {
      const timer = setTimeout(() => {
        const discount = handleComputeDiscountedAmount(
          createOrFormData?.amount as number,
          createOrFormData?.discount_id as string
        )

        setCreateOrFormData({
          ...createOrFormData,
          amount: discount?.discountedAmount as number,
          amount_words: discount?.discountedAmountWords as string,
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
    fetchPayors()
    fetchParticulars()
    fetchDiscounts()
  }, [accessToken])

  useEffect(() => {
    setTabContents([
      {
        index: 0,
        label: (
          <Stack direction='row'>
            CREATE/ISSUE OR&nbsp;
            {loading && tabValue === 0 && (
              <CircularProgress size={16} color='primary' />
            )}
          </Stack>
        ),
      },
      {
        index: 1,
        label: (
          <Stack direction='row'>
            OR LIST&nbsp;
            {loading && tabValue === 1 && (
              <CircularProgress size={16} color='primary' />
            )}
          </Stack>
        ),
      },
    ])
  }, [loading, tabValue])

  // Set default paper size
  useEffect(() => {
    if (paperSizes) {
      const defaultPaperSize = paperSizes.find(
        (paper) => paper.paper_name === 'Official Receipt'
      )
      setPaperSize(defaultPaperSize?.id ?? '')
    }
  }, [paperSizes])

  // Handle global loading
  useEffect(() => {
    if (
      userLoading ||
      orListLoading ||
      paperSizeLoading ||
      logoutLoading ||
      formSaveLoading ||
      printDownloadLoading
    ) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [
    userLoading,
    orListLoading,
    paperSizeLoading,
    logoutLoading,
    formSaveLoading,
    printDownloadLoading,
  ])

  // Check if user is already logged in
  useEffect(() => {
    if (loading) return
    if (!userLoading && !isAuthenticated) forceRelogin()
  }, [isAuthenticated, loading, userLoading])

  const checkOrIfHasDuplicate = (orNo: string) => {
    setCheckOrDuplicateLoading(true)
    setCheckOrDuplicateStatus('')

    if (accessToken && orNo !== '') {
      API.checkOfficialReceiptsDuplicate(accessToken, orNo)
        .then((response) => {
          const res = response?.data.data
          setCheckOrDuplicateStatus(
            res?.has_duplicate === '1' ? 'duplicate' : 'success'
          )
          setCheckOrDuplicateLoading(false)

          if (res?.has_duplicate === '1') {
            toast.error(res?.message)
          }
        })
        .catch((error) => {
          toast.error(
            'An error occurred while checking duplicate. Please try again.'
          )
          setCheckOrDuplicateStatus('error')
          setCheckOrDuplicateLoading(false)
        })
    } else {
      setCheckOrDuplicateLoading(false)
      setCheckOrDuplicateStatus('')
    }
  }

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
          toast.error(
            'An error occurred while fetching payors. Please try again.'
          )
          setPayorLoading(false)
        })
    }
  }

  const handlePageChange = (url: string) => {
    fetchOfficialReceipts(url)
  }

  const dynamicTabContents = (index: number) => {
    if (index === 0)
      return (
        <CreateOr
          personnelName={
            userInfo
              ? `${userInfo?.first_name} ${userInfo?.last_name}`
              : 'Loading...'
          }
          payors={payors ?? []}
          particulars={particulars ?? []}
          discounts={discounts ?? []}
          formData={createOrFormData}
          enableUpdate={enableUpdate}
          computingDiscount={changedAmountDiscount}
          checkOrDuplicateLoading={checkOrDuplicateLoading}
          handleInputChange={(input_name, value) =>
            handleInputChange(input_name, value)
          }
          handleCreate={(data, print) => handleCreateOr(data, print)}
          handlePrint={(orId, paperSizeId) =>
            handlePrintDownloadOr(orId, paperSizeId, true)
          }
          handleClear={handleClear}
          fetchPayor={() => fetchPayors()}
          fetchParticular={() => fetchParticulars()}
          fetchDiscount={() => fetchDiscounts()}
          handleDialogOpen={(dialogType) => handleDialogOpen(dialogType)}
          payorLoading={payorLoading}
          particularLoading={particularLoading}
          discountLoading={discountLoading}
          checkOrDuplicateStatus={checkOrDuplicateStatus}
          handleEnableUpdate={handleEnableUpdate}
          handleDisableUpdate={handleDisableUpdate}
        />
      )

    if (index === 1) {
      const rows = orListData?.data?.map((or: any) => {
        return {
          id: or.id,
          accountable_personnel: `${or.accountable_personnel.first_name} ${or.accountable_personnel.last_name}`,
          deposited_by: `${or?.deposited_by?.first_name} ${or?.deposited_by?.last_name}`,
          cancelled_by: `${or?.cancelled_by?.first_name} ${or?.cancelled_by?.last_name}`,
          receipt_date: dayjs(or.receipt_date).format('MM/DD/YYYY'),
          cancelled_date:
            !!or.cancelled_date === true
              ? dayjs(or.cancelled_date).format('MM/DD/YYYY')
              : '',
          deposited_date:
            !!or.deposited_date === true
              ? dayjs(or.deposited_date).format('MM/DD/YYYY')
              : '',
          or_no: or.or_no,
          payor_id: or.payor.id,
          payor: or.payor.payor_name,
          nature_collection_id: or.nature_collection.id,
          nature_collection: or.nature_collection.particular_name,
          amount: or.amount,
          amount_str: or.amount
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          amount_words: or.amount_words,
          discount_id: or?.discount?.id,
          discount: or?.discount?.discount_name ?? 'N/a',
          discount_percent: or?.discount?.percent ?? 0,
          card_no: or?.card_no ?? '',
          deposit: or.deposit ?? 0,
          deposit_str: or.deposit
            ? or.deposit
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : 0,
          payment_mode: or.payment_mode,
          drawee_bank: or?.drawee_bank,
          check_no: or?.check_no,
          check_date: or?.check_date
            ? dayjs(or.check_date).format('MM/DD/YYYY')
            : undefined,
          is_cancelled: or.is_cancelled,
          status: or.is_cancelled
            ? 'Cancelled'
            : or.deposit
              ? 'Deposited'
              : 'Pending',
          updated_at: or.updated_at ?? undefined,
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
          rows={rows ?? []}
          loading={loading}
          currentPage={currentPage}
          nextPageUrl={nextPageUrl}
          prevPageUrl={prevPageUrl}
          from={from}
          to={to}
          total={total}
          links={links}
          handlePageChange={handlePageChange}
          handleDeposit={() => handleDialogOpen('deposit_or')}
          handleCancel={() => handleDialogOpen('cancel_or')}
          handleRevert={() => handleDialogOpen('revert_to_pending_or')}
          showDetails={showDetails}
          formData={createOrFormData}
          details={details ?? {}}
          enableUpdate={enableUpdate}
          paperSize={paperSize}
          payors={payors ?? []}
          particulars={particulars ?? []}
          discounts={discounts ?? []}
          handleShowDetails={handleShowDetails}
          handleCloseDetails={handleCloseDetails}
          handlePrintDownloadOr={handlePrintDownloadOr}
          handleInputChange={handleInputChange}
          handleEnableUpdate={handleEnableUpdate}
          handleDisableUpdate={handleDisableUpdate}
          computingDiscount={changedAmountDiscount}
          checkOrDuplicateLoading={checkOrDuplicateLoading}
          payorLoading={payorLoading}
          particularLoading={particularLoading}
          discountLoading={discountLoading}
          checkOrDuplicateStatus={checkOrDuplicateStatus}
          handleUpdate={handleUpdateOr}
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
          toast.error(
            'An error occurred while fetching discounts. Please try again.'
          )
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
          toast.error(
            'An error occurred while fetching particulars. Please try again.'
          )
          setParticularLoading(false)
        })
    }
  }

  // Fetch official receipts
  const fetchOfficialReceipts = (url?: string) => {
    setOrListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching official receipts. Please try again.'

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
          toast.error(
            'An error occurred while fetching paper sizes. Please try again.'
          )
          setPaperSizeLoading(false)
        })
    }
  }

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

  // Handle input changes
  const handleInputChange = (
    input_name: string,
    value: string | number | null
  ) => {
    let amountWords = ''

    if (input_name === 'discount_id') {
      setChangedAmountDiscount(true)
    }

    if (input_name === 'amount') {
      setChangedAmountDiscount(true)
      try {
        amountWords = convertToWords((value as number) ?? 0)

        if (!!value === false) amountWords = ''
      } catch (error) {
        amountWords = ''
      }

      setCreateOrFormData({
        ...createOrFormData,
        amount: value as number,
        amount_words: amountWords,
      })
    } else if (input_name === 'or_no') {
      const orNo = value as string
      checkOrIfHasDuplicate(orNo.trim() ?? '')
      setCreateOrFormData({
        ...createOrFormData,
        or_no: orNo.trim(),
      })
    } else {
      if (
        input_name === 'payment_mode' &&
        value !== 'check' &&
        (value === 'cash' || value === 'money_order')
      ) {
        setCreateOrFormData({
          ...createOrFormData,
          [input_name]: value,
          drawee_bank: undefined,
          check_no: undefined,
          check_date: undefined,
        })
      } else {
        setCreateOrFormData({ ...createOrFormData, [input_name]: value })
      }
    }
  }

  const handleInputChangeParticulars = (
    input_name: string,
    value: string | number | null
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

  const handleInputChangeDeposit = (
    input_name: string,
    value: string | number | null
  ) => {
    setDepositFormData({ ...depositFormData, [input_name]: value })
  }

  // Handle clear form
  const handleClear = () => {
    setCreateOrFormData(defaultCreateOrFormData)
    setParticularFormData(defaultParticularFormData)
    setDiscountFormData(defaultDiscountFormData)
    setCheckOrDuplicateLoading(false)
    setCheckOrDuplicateStatus('')
    handleCloseDetails()
  }

  // Handle create official receipt
  const handleCreateOr = (formData: IOfficialReceipt, print = false) => {
    setFormSaveLoading(true)

    if (formData?.discount_id) {
      const requiresCardNo =
        discounts?.find(
          (discount: IDiscount) => discount.id === formData?.discount_id
        )?.requires_card_no ?? false

      if (requiresCardNo && !formData?.card_no) {
        toast.error('ID/Card Number field is required.')
        setFormSaveLoading(false)
        return
      }
    }

    if (
      formData?.payment_mode === 'check' &&
      (!formData?.drawee_bank || !formData?.check_no || !formData?.check_date)
    ) {
      if (!formData?.drawee_bank) toast.error('Drawee Bank field is required.')
      if (!formData?.check_no) toast.error('Check Number field is required.')
      if (!formData?.check_date) toast.error('Check Date field is required.')

      setFormSaveLoading(false)
      return
    }

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
            handlePrintDownloadOr(res?.data?.id, paperSize, print)
            //handlePrintDownloadOr(res?.data?.id, paperSize, false)
          } else {
            handlePrintDownloadOr(res?.data?.id, paperSize, false)
          }

          setTempPrintId(res?.data?.id)
          setCreateOrFormData(defaultCreateOrFormData)
          setCheckOrDuplicateLoading(false)
          setCheckOrDuplicateStatus('')
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

  // Handle create official receipt
  const handleUpdateOr = (formData: any) => {
    setFormSaveLoading(true)

    if (formData?.discount_id) {
      const requiresCardNo =
        discounts?.find(
          (discount: IDiscount) => discount.id === formData?.discount_id
        )?.requires_card_no ?? false

      if (requiresCardNo && !formData?.card_no) {
        toast.error('ID/Card Number field is required.')
        setFormSaveLoading(false)
        return
      }
    }

    if (
      formData?.payment_mode === 'check' &&
      (!formData?.drawee_bank || !formData?.check_no || !formData?.check_date)
    ) {
      if (!formData?.drawee_bank) toast.error('Drawee Bank field is required.')
      if (!formData?.check_no) toast.error('Check Number field is required.')
      if (!formData?.check_date) toast.error('Check Date field is required.')

      setFormSaveLoading(false)
      return
    }

    if (accessToken && changedAmountDiscount === false) {
      API.updateOfficialReceipt(accessToken, formData?.id, formData).then(
        (response) => {
          const res = response?.data.data

          if (res?.error) {
            toast.error(res?.message)
            setFormSaveLoading(false)
            return
          }

          toast.success(res?.message)
          setFormSaveLoading(false)
          setCheckOrDuplicateLoading(false)
          setCheckOrDuplicateStatus('')
          setDetails({
            ...formData,
            payor: res?.data?.payor.payor_name,
            nature_collection: res?.data?.nature_collection.particular_name,
            discount: res?.data?.discount
              ? res?.data?.discount.discount_name
              : 'N/a',
          })

          setEnableUpdate(false)
          setTempPrintId(res?.data?.id)
        }
      )
      // .catch((error) => {
      //   const res = error?.response?.data.data
      //   toast.error(res?.message ?? 'Unknown error occurred.')
      //   setFormSaveLoading(false)
      // })
    } else {
      toast.error('Please wait for the discount computation to finish.')
      setFormSaveLoading(false)
    }
  }

  // Handle compute discounted amount from discounts with amount words
  const handleComputeDiscountedAmount = (
    amount: number,
    discount_id: string
  ) => {
    // Find discount using discount id
    const selectedDiscount = discounts?.find(
      (discount) => discount.id === discount_id
    )

    if (!selectedDiscount) return

    const totalDiscount = amount * ((selectedDiscount?.percent ?? 0) / 100)
    const discountedAmount = amount - totalDiscount
    const discountedAmountWords = convertToWords(discountedAmount)

    return {
      discountedAmount: discountedAmount ?? 0,
      discountedAmountWords: discountedAmountWords ?? '',
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
      toast.error(
        'An error occurred while creating particulars. Please try again.'
      )
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
      toast.error(
        'An error occurred while creating discounts. Please try again.'
      )
      setFormSaveLoading(false)
    }
  }

  // Handle deposit OR
  const handleDepositOr = (formData: IDeposit) => {
    setFormSaveLoading(true)
    if (accessToken) {
      API.depositOfficialReceipt(accessToken, formData.id, formData)
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
          handleCloseDetails()
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res.message)
          setFormSaveLoading(false)
        })
    } else {
      toast.error(
        'An error occurred while depositing official receipt. Please try again.'
      )
      setFormSaveLoading(false)
    }
  }

  const handleCancelOr = (orId: string) => {
    setFormSaveLoading(true)
    if (accessToken && orId) {
      API.cancelOfficialReceipt(accessToken, orId)
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
          handleCloseDetails()
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res.message)
          setFormSaveLoading(false)
        })
    } else {
      toast.error(
        'An error occurred while cancelling official receipt. Please try again.'
      )
      setFormSaveLoading(false)
    }
  }

  const handleRevertStatusOr = (orId: string) => {
    setFormSaveLoading(true)
    if (accessToken && orId) {
      API.revertToPendingOfficialReceipt(accessToken, orId)
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
          handleCloseDetails()
        })
        .catch((error) => {
          const res = error?.response?.data.data
          toast.error(res.message)
          setFormSaveLoading(false)
        })
    } else {
      toast.error(
        'An error occurred while cancelling official receipt. Please try again.'
      )
      setFormSaveLoading(false)
    }
  }

  const handleShowDetails = (details: IOfficialReceipt) => {
    const hasDiscount = details?.discount === 'N/a' ? false : true
    const regular = hasDiscount
      ? (details?.amount ?? 0) / (1 - (details?.discount_percent ?? 0) / 100) ??
        0
      : details?.amount ?? 0
    const discounted = hasDiscount ? details?.amount ?? 0 : 0
    const deposit = details?.amount ?? 0

    setDetails(details)
    setTempPrintId(details?.id ?? '')
    setDepositFormData({
      ...depositFormData,
      id: details?.id ?? '',
      has_discount: hasDiscount,
      deposit,
      regular,
      discounted,
    })
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setDetails({})
    setTempPrintId('')
    setDepositFormData(defaultDepositFormData)
  }

  const handleDownloadPdf = (filename: string, blob: string) => {
    const link = document.createElement('a')
    link.href = blob
    link.download = filename
    link.click()
  }

  // Handle print official receipt
  const handlePrintDownloadOr = (
    orId: string,
    paperSizeId: string,
    print = false
  ) => {
    setPrintDownloadLoading(true)
    if (accessToken) {
      const hasTemplate = print ? '0' : '1'
      API.getPrintableOR(accessToken, orId, paperSizeId, hasTemplate)
        .then((response) => {
          const pdfUrl = `data:application/pdf;base64,${response.data.data.pdf}`

          if (print) {
            setPrintUrl(pdfUrl)
            handleDialogOpen('print')
          } else {
            handleDownloadPdf(response.data.data.filename, pdfUrl)
          }

          setPrintDownloadLoading(false)
        })
        .catch((error) => {
          console.log(error.message)
          setPrintDownloadLoading(false)
        })
    } else {
      toast.error(
        'An error occurred while fetching printable official receipt. Please try again.'
      )
      setPrintDownloadLoading(false)
    }
  }

  const handleEnableUpdate = () => {
    setCreateOrFormData(details ?? {})
    setEnableUpdate(true)
  }

  const handleDisableUpdate = () => {
    setEnableUpdate(false)
  }

  // Convert to to words
  const convertToWords = (amount: number) => {
    const toWords = new ToWords({
      localeCode: 'en-PH',
    })
    return toWords.convert(amount, {
      currency: true,
    })
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
      {(formSaveLoading || printDownloadLoading) && <Loader />}
      <Stack p={2}>
        <CardContainer title='Official Receipt'>
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
        open={dialogOpen.print ?? false}
        title='Print Official Receipt'
        dialogType='print'
        printUrl={printUrl}
        handleClose={() => handleDialogClose('print')}
        handleDownload={() =>
          handlePrintDownloadOr(tempPrintId, paperSize, false)
        }
        handleClear={() => setPrintUrl('')}
      />
      <SystemDialog
        open={dialogOpen.create_particulars ?? false}
        title='Create Particular'
        dialogType='create'
        content='particulars'
        formData={particularFormData}
        handleClose={() => handleDialogClose('create_particulars')}
        handleClear={() => setParticularFormData(defaultParticularFormData)}
        handleCreate={handleCreateParticulars}
        handleInputChange={handleInputChangeParticulars}
      />
      <SystemDialog
        open={dialogOpen.create_discounts ?? false}
        title='Create Discount'
        dialogType='create'
        content='discounts'
        formData={discountFormData}
        handleClose={() => handleDialogClose('create_discounts')}
        handleClear={() => setDiscountFormData(defaultDiscountFormData)}
        handleCreate={handleCreateDiscount}
        handleInputChange={handleInputChangeDiscounts}
      />
      <SystemDialog
        open={dialogOpen.deposit_or ?? false}
        title='Deposit Official Receipt'
        dialogType='deposit'
        formData={depositFormData}
        handleClose={() => handleDialogClose('deposit_or')}
        handleDeposit={handleDepositOr}
        handleInputChange={handleInputChangeDeposit}
      />
      <SystemDialog
        open={dialogOpen.cancel_or ?? false}
        title='Cancel Official Receipt'
        dialogType='cancel'
        id={details?.id}
        handleClose={() => handleDialogClose('cancel_or')}
        handleCancel={handleCancelOr}
      />
      <SystemDialog
        open={dialogOpen.revert_to_pending_or ?? false}
        title='Revert Status for Official Receipt'
        dialogType='revert'
        id={details?.id}
        handleClose={() => handleDialogClose('revert_to_pending_or')}
        handleRevert={handleRevertStatusOr}
      />
    </MiniVariantDrawer>
  )
}

export default OfficialReceipt
