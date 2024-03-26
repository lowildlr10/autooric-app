'use client'
import React, { useEffect, useState } from 'react'
import useAccessToken from '@/hooks/useAccessToken'
import useUserInfo from '@/hooks/useUserInfo'
import { Stack } from '@mui/material'
import MiniVariantDrawer from '@/components/Drawer/MiniVariantDrawer'
import Loader from '@/components/Loader'
import {
  IOpenDialog,
  ITabContents,
  ICategories,
  IParticular,
  OpenDialogType,
  IDiscount,
  IPaperSize,
  DialogContent,
  ISignatory,
  IAccount,
} from '@/Interfaces'
import CardContainer from '@/components/CardContainer'
import TabContainer, { CustomTabPanel } from '@/components/TabContainer'
import SystemDialog from '../SystemDialog'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import CategoryList from './Categories/CategoryList'
import ParticularList from './Particulars/ParticularList'
import DiscountList from './Discounts/DiscountList'
import PaperSizeList from './PaperSizes/PaperSizeList'
import SignatoryList from './Signatories/SignatoryList'
import AccountList from './Accounts/AccountList'

const defaultCategoryFormData: ICategories = {
  id: '',
  category_name: '',
  order_no: 0,
}

const defaultAccountFormData: IAccount = {
  id: '',
  account_name: '',
  account_number: ''
}

const defaultParticularFormData: IParticular = {
  id: '',
  category_id: '',
  category_str: '',
  account_id: '',
  account_str: '',
  particular_name: '',
  default_amount: 0,
  default_amount_str: '',
  order_no: 0,
  coa_accounting: false,
  pnp_crame: false,
  firearms_registration: false
}

const defaultDiscountFormData: IDiscount = {
  id: '',
  discount_name: '',
  percent: 0,
  percent_str: '',
  requires_card_no: false,
  is_active: true,
  requires_card_no_str: '',
  status: '',
}

const defaultSignatoryFormData: ISignatory = {
  id: '',
  signatory_name: '',
  report_module: [
    {
      report: 'crr_certified_correct',
      is_enabled: false,
      position_id: '',
      designation_id: '',
      station_id: '',
    },
    {
      report: 'roc_certified_correct',
      is_enabled: false,
      position_id: '',
      designation_id: '',
      station_id: '',
    },
    {
      report: 'roc_noted_by',
      is_enabled: false,
      position_id: '',
      designation_id: '',
      station_id: '',
    },
  ],
  is_active: true,
}

const defaultPaperSizeFormData: IPaperSize = {
  id: '',
  paper_name: '',
  width: 0,
  height: 0,
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
  const [signatoryListLoading, setSignatoryListLoading] = useState(false)
  const [paperSizeListLoading, setPaperSizeListLoading] = useState(false)
  const [accountListLoading, setAccountListLoading] = useState(false)
  const [formSaveLoading, setFormSaveLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [categoryListData, setCategoryListData] = useState<any>()
  const [particularListData, setParticularListData] = useState<any>()
  const [discountListData, setDiscountListData] = useState<any>()
  const [signatoryListData, setSignatoryListData] = useState<any>()
  const [paperSizeListData, setPaperSizeListData] = useState<any>()
  const [accountListData, setAccountListData] = useState<any>()
  const [tabValue, setTabValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState<IOpenDialog>({})
  const [tabContents, setTabContents] = useState<ITabContents[]>([])
  const [currentCreateTitle, setCurrentCreateTitle] = useState('')
  const [currentUpdateTitle, setCurrentUpdateTitle] = useState('')
  const [currentDeleteTitle, setCurrentDeleteTitle] = useState('')
  const [currentContent, setCurrentContent] = useState<DialogContent>()
  const [currentCreateDialog, setCurrentCreateDialog] =
    useState<OpenDialogType>('create_categories')
  const [currentUpdateDialog, setCurrentUpdateDialog] =
    useState<OpenDialogType>('update_categories')
  const [currentDeleteDialog, setCurrentDeleteDialog] =
    useState<OpenDialogType>('delete_categories')
  const [currentFormData, setCurrentFormData] = useState<
    ICategories | IParticular | IDiscount | IPaperSize
  >()
  const [categoryFormData, setCategoryFormData] = useState<ICategories>(
    defaultCategoryFormData
  )
  const [particularFormData, setParticularFormData] = useState<IParticular>(
    defaultParticularFormData
  )
  const [discountFormData, setDiscountFormData] = useState<IDiscount>(
    defaultDiscountFormData
  )
  const [signatoryFormData, setSignatoryFormData] = useState<ISignatory>(
    defaultSignatoryFormData
  )
  const [paperSizeFormData, setPaperSizeFormData] = useState<IPaperSize>(
    defaultPaperSizeFormData
  )
  const [accountFormData, setAccountFormData] = useState<IAccount>(
    defaultAccountFormData
  )

  // Handle global loading
  useEffect(() => {
    if (
      userLoading ||
      logoutLoading ||
      categoryListLoading ||
      particularListLoading ||
      discountListLoading ||
      signatoryListLoading ||
      paperSizeListLoading ||
      accountListLoading ||
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
    signatoryListLoading,
    paperSizeListLoading,
    accountListLoading,
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
      },
      {
        index: 5,
        label: 'ACCOUNTS',
      },
    ])
  }, [])

  useEffect(() => {
    switch (tabValue) {
      case 0:
        setCurrentCreateTitle('Create Category')
        setCurrentContent('cateogories')
        setCurrentCreateDialog('create_categories')
        setCurrentUpdateDialog('update_categories')

        if (accessToken) {
          fetchCategories()
        }
        break
      case 1:
        setCurrentCreateTitle('Create Particular')
        setCurrentContent('particulars')
        setCurrentCreateDialog('create_particulars')
        setCurrentUpdateDialog('update_particulars')
        setCurrentDeleteDialog('delete_particulars')

        if (accessToken) {
          fetchParticulars()
        }
        break
      case 2:
        setCurrentCreateTitle('Create Discount')
        setCurrentContent('discounts')
        setCurrentCreateDialog('create_discounts')
        setCurrentUpdateDialog('update_discounts')
        setCurrentDeleteDialog('delete_discounts')

        if (accessToken) {
          fetchDiscounts()
        }
        break
      case 3:
        setCurrentCreateTitle('Create Signatory')
        setCurrentDeleteTitle('Delete Signatory')
        setCurrentContent('signatories')
        setCurrentCreateDialog('create_signatories')
        setCurrentUpdateDialog('update_signatories')
        setCurrentDeleteDialog('delete_signatories')

        if (accessToken) {
          fetchSignatories()
        }
        break
      case 4:
        setCurrentCreateTitle('Create Paper Size')
        setCurrentContent('paper_sizes')
        setCurrentCreateDialog('create_paper_sizes')
        setCurrentUpdateDialog('update_paper_sizes')
        setCurrentDeleteDialog('delete_paper_sizes')

        if (accessToken) {
          fetchPaperSizes()
        }
        break
      case 5:
        setCurrentCreateTitle('Create Account')
        setCurrentContent('accounts')
        setCurrentCreateDialog('create_accounts')
        setCurrentUpdateDialog('update_accounts')
        setCurrentDeleteDialog('delete_accounts')

        if (accessToken) {
          fetchAccounts()
        }
        break
      default:
        break
    }
  }, [accessToken, tabValue])

  useEffect(() => {
    switch (tabValue) {
      case 0:
        setCurrentUpdateTitle(
          `Category Details (${categoryFormData?.category_name})`
        )
        setCurrentDeleteTitle(
          `Delete Category (${categoryFormData?.category_name})`
        )
        setCurrentFormData(categoryFormData)
        break
      case 1:
        setCurrentUpdateTitle(
          `Particular Details (${particularFormData?.particular_name})`
        )
        setCurrentDeleteTitle(
          `Delete Particular (${particularFormData?.particular_name})`
        )
        setCurrentFormData(particularFormData)
        break
      case 2:
        setCurrentUpdateTitle(
          `Discount Details (${discountFormData?.discount_name})`
        )
        setCurrentDeleteTitle(
          `Delete Discount (${discountFormData?.discount_name})`
        )
        setCurrentFormData(discountFormData)
        break
      case 3:
        setCurrentUpdateTitle(
          `Signatory Details (${signatoryFormData?.signatory_name})`
        )
        setCurrentDeleteTitle(
          `Delete Discount (${signatoryFormData?.signatory_name})`
        )
        setCurrentFormData(signatoryFormData)
        break
      case 4:
        setCurrentUpdateTitle(
          `Paper Size Details (${[paperSizeFormData?.paper_name]})`
        )
        setCurrentDeleteTitle(
          `Delete Paper Size (${[paperSizeFormData?.paper_name]})`
        )
        setCurrentFormData(paperSizeFormData)
        break
      case 5:
        setCurrentUpdateTitle(
          `Account Details (${[accountFormData?.account_name]})`
        )
        setCurrentDeleteTitle(
          `Delete Account (${[accountFormData?.account_name]})`
        )
        setCurrentFormData(accountFormData)
        break
      default:
        break
    }
  }, [
    tabValue,
    categoryFormData,
    particularFormData,
    discountFormData,
    signatoryFormData,
    paperSizeFormData,
    accountFormData
  ])

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

  // Fetch accounts
  const fetchAccounts = (url?: string) => {
    setAccountListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching lists. Please try again.'

      if (url) {
        API.getAccountsByUrl(accessToken, url)
          .then((response) => {
            const res = response?.data.data
            setAccountListData(res)
            setAccountListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setAccountListLoading(false)
          })
      } else {
        API.getPaginatedAccounts(accessToken)
          .then((response) => {
            const res = response?.data.data
            setAccountListData(res)
            setAccountListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setAccountListLoading(false)
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

  // Fetch signatories
  const fetchSignatories = (url?: string) => {
    setSignatoryListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching lists. Please try again.'

      if (url) {
        API.getSignatoriesByUrl(accessToken, url)
          .then((response) => {
            const res = response?.data.data
            setSignatoryListData(res)
            setSignatoryListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setSignatoryListLoading(false)
          })
      } else {
        API.getPaginatedSignatories(accessToken)
          .then((response) => {
            const res = response?.data.data
            setSignatoryListData(res)
            setSignatoryListLoading(false)
          })
          .catch((error) => {
            toast.error(errorMessage)
            setSignatoryListLoading(false)
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
        break
      case 2:
        fetchDiscounts(url)
        break
      case 3:
        fetchSignatories(url)
        break
      case 4:
        fetchPaperSizes(url)
        break
      case 5:
        fetchAccounts(url)
        break
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
          order_no: details.order_no,
        })
        handleDialogOpen('update_categories')
        break
      case 1:
        setParticularFormData({
          ...particularFormData,
          id: details.id,
          category_id: details.category_id,
          account_id: details.account_id,
          particular_name: details.particular_name,
          default_amount: details.default_amount,
          order_no: details.order_no,
          coa_accounting: details.coa_accounting,
          pnp_crame: details.pnp_crame,
          firearms_registration: details.firearms_registration
        })
        handleDialogOpen('update_particulars')
        break
      case 2:
        setDiscountFormData({
          ...discountFormData,
          id: details.id,
          discount_name: details.discount_name,
          percent: details.percent,
          requires_card_no: details.requires_card_no,
          is_active: details.is_active,
        })
        handleDialogOpen('update_discounts')
        break
      case 3:
        setSignatoryFormData({
          ...signatoryFormData,
          id: details.id,
          signatory_name: details.signatory_name,
          report_module: details.report_module,
          is_active: details.is_active,
        })
        handleDialogOpen('update_signatories')
        break
      case 4:
        setPaperSizeFormData({
          ...paperSizeFormData,
          id: details.id,
          paper_name: details.paper_name,
          width: details.width,
          height: details.height,
        })
        handleDialogOpen('update_paper_sizes')
        break
      case 5:
        setAccountFormData({
          ...accountFormData,
          id: details.id,
          account_name: details.account_name,
          account_number: details.account_number
        })
        handleDialogOpen('update_accounts')
        break
      default:
        break
    }
  }

  const handleInputChangeCategories = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryFormData({
      ...categoryFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleInputChangeAccounts = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountFormData({
      ...accountFormData,
      [e.target.name]: e.target.value,
    })
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

    if (elemName === 'is_active') {
      setDiscountFormData({
        ...discountFormData,
        is_active: e.target.checked,
      })
      return
    }

    setDiscountFormData({
      ...discountFormData,
      [elemName]: e.target.value,
    })
  }

  const handleInputChangeSignatories = (
    input_name: string,
    value: string | number | boolean | any[] | null
  ) => {
    setSignatoryFormData({ ...signatoryFormData, [input_name]: value })
  }

  const handleInputChangePaperSizes = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaperSizeFormData({
      ...paperSizeFormData,
      [e.target.name]: e.target.value,
    })
  }

  //Handle create records
  const handleCreateRecord = (
    formData: ICategories | IParticular | IDiscount | ISignatory | IPaperSize | IAccount
  ) => {
    setFormSaveLoading(true)

    if (accessToken) {
      switch (tabValue) {
        case 0:
          API.createCategories(accessToken, formData)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setFormSaveLoading(false)
                return
              }

              toast.success(res?.message)
              setFormSaveLoading(false)
              setCategoryFormData(defaultCategoryFormData)
              fetchCategories()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        case 1:
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
              setParticularFormData(defaultParticularFormData)
              fetchParticulars()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        case 2:
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
              setDiscountFormData(defaultDiscountFormData)
              fetchDiscounts()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        case 3:
          API.createSignatory(accessToken, formData)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setFormSaveLoading(false)
                return
              }

              toast.success(res?.message)
              setFormSaveLoading(false)
              setSignatoryFormData(defaultSignatoryFormData)
              fetchSignatories()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        case 4:
          API.createPaperSizes(accessToken, formData)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setFormSaveLoading(false)
                return
              }

              toast.success(res?.message)
              setFormSaveLoading(false)
              setPaperSizeFormData(defaultPaperSizeFormData)
              fetchPaperSizes()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        case 5:
          API.createAccounts(accessToken, formData)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setFormSaveLoading(false)
                return
              }

              toast.success(res?.message)
              setFormSaveLoading(false)
              setAccountFormData(defaultAccountFormData)
              fetchAccounts()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        default:
          toast.error(
            'An error occurred while creating the record. Please try again.'
          )
          setFormSaveLoading(false)
          break
      }
    } else {
      toast.error(
        'An error occurred while creating the record. Please try again.'
      )
      setFormSaveLoading(false)
    }
  }

  // Handle update records
  const handleUpdateRecord = (
    formData: ICategories | IParticular | IDiscount | ISignatory | IPaperSize
  ) => {
    setFormSaveLoading(true)

    if (accessToken) {
      switch (tabValue) {
        case 0:
          API.updateCategory(accessToken, formData?.id ?? '', formData)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setFormSaveLoading(false)
                return
              }

              toast.success(res?.message)
              setFormSaveLoading(false)
              setCategoryFormData(defaultCategoryFormData)
              fetchCategories()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        case 1:
          API.updateParticular(accessToken, formData?.id ?? '', formData)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setFormSaveLoading(false)
                return
              }

              toast.success(res?.message)
              setFormSaveLoading(false)
              setParticularFormData(defaultParticularFormData)
              fetchParticulars()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        case 2:
          API.updateDiscount(accessToken, formData?.id ?? '', formData)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setFormSaveLoading(false)
                return
              }

              toast.success(res?.message)
              setFormSaveLoading(false)
              setDiscountFormData(defaultDiscountFormData)
              fetchDiscounts()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        case 3:
          API.updateSignatory(accessToken, formData?.id ?? '', formData)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setFormSaveLoading(false)
                return
              }

              toast.success(res?.message)
              setFormSaveLoading(false)
              setSignatoryFormData(defaultSignatoryFormData)
              fetchSignatories()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        case 4:
          API.updatePaperSize(accessToken, formData?.id ?? '', formData)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setFormSaveLoading(false)
                return
              }

              toast.success(res?.message)
              setFormSaveLoading(false)
              setPaperSizeFormData(defaultPaperSizeFormData)
              fetchPaperSizes()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        case 5:
          API.updateAccount(accessToken, formData?.id ?? '', formData)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setFormSaveLoading(false)
                return
              }

              toast.success(res?.message)
              setFormSaveLoading(false)
              setAccountFormData(defaultAccountFormData)
              fetchAccounts()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setFormSaveLoading(false)
            })
          break
        default:
          break
      }
    } else {
      toast.error(
        'An error occurred while updating the record. Please try again.'
      )
      setFormSaveLoading(false)
    }
  }

  const handleDeleteRecord = (id: string) => {
    setDeleteLoading(true)

    if (accessToken && id) {
      switch (tabValue) {
        case 0:
          API.deleteCategory(accessToken, id)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setDeleteLoading(false)
                return
              }

              toast.success(res?.message)
              setDeleteLoading(false)
              setCategoryFormData(defaultCategoryFormData)
              setDialogOpen({
                create_categories: false,
                update_categories: false,
                delete_categories: false,
              })
              fetchCategories()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setDeleteLoading(false)
            })
          break
        case 1:
          API.deleteParticular(accessToken, id)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setDeleteLoading(false)
                return
              }

              toast.success(res?.message)
              setDeleteLoading(false)
              setParticularFormData(defaultParticularFormData)
              setDialogOpen({
                create_particulars: false,
                update_particulars: false,
                delete_particulars: false,
              })
              fetchParticulars()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setDeleteLoading(false)
            })
          break
        case 2:
          API.deleteDisount(accessToken, id)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setDeleteLoading(false)
                return
              }

              toast.success(res?.message)
              setDeleteLoading(false)
              setDiscountFormData(defaultDiscountFormData)
              setDialogOpen({
                create_discounts: false,
                update_discounts: false,
                delete_discounts: false,
              })
              fetchDiscounts()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setDeleteLoading(false)
            })
          break
        case 3:
          API.deleteSignatory(accessToken, id)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setDeleteLoading(false)
                return
              }

              toast.success(res?.message)
              setDeleteLoading(false)
              setSignatoryFormData(defaultSignatoryFormData)
              setDialogOpen({
                create_signatories: false,
                update_signatories: false,
                delete_signatories: false,
              })
              fetchSignatories()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setDeleteLoading(false)
            })
          break
        case 4:
          API.deletePaperSize(accessToken, id)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setDeleteLoading(false)
                return
              }

              toast.success(res?.message)
              setDeleteLoading(false)
              setPaperSizeFormData(defaultPaperSizeFormData)
              setDialogOpen({
                create_paper_sizes: false,
                update_paper_sizes: false,
                delete_paper_sizes: false,
              })
              fetchPaperSizes()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setDeleteLoading(false)
            })
          break
        case 5:
          API.deleteAccount(accessToken, id)
            .then((response) => {
              const res = response?.data.data
              if (res?.error) {
                toast.error(res?.message)
                setDeleteLoading(false)
                return
              }

              toast.success(res?.message)
              setDeleteLoading(false)
              setAccountFormData(defaultAccountFormData)
              setDialogOpen({
                create_accounts: false,
                update_accounts: false,
                delete_accounts: false,
              })
              fetchAccounts()
            })
            .catch((error) => {
              const res = error?.response?.data.data
              toast.error(res.message)
              setDeleteLoading(false)
            })
          break
        default:
          break
      }
    } else {
      toast.error(
        'An error occurred while deleting a record. Please try again.'
      )
      setDeleteLoading(false)
    }
  }

  const dynamicTabContents = (index: number) => {
    if (index === 0) {
      const rows = categoryListData?.data?.map((category: any) => {
        return {
          id: category?.id,
          category_name: category?.category_name,
          order_no: category?.order_no,
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
          handleShowCreate={() => handleDialogOpen('create_categories')}
        />
      )
    } else if (index === 1) {
      const rows: any = []
      particularListData?.data?.forEach((category: any) => {
        rows.push({
          id: category?.id,
          category_name: category?.category_name,
          sub_rows: category?.particulars?.map((particular: any) => {
            return {
              id: particular?.id,
              particular_name: particular?.particular_name,
              category_id: particular?.category_id,
              category_str: category?.category_name,
              account_id: particular?.account_id,
              account_str: 
                `${particular?.account?.account_name}  
                ${particular?.account?.account_number ? `(${particular?.account?.account_number})` : ''}`,
              default_amount: particular?.default_amount ?? 0,
              default_amount_str: particular?.default_amount
                ? particular.default_amount
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : 'N/a',
              order_no: particular.order_no,
              coa_accounting: particular.coa_accounting,
              pnp_crame: particular.pnp_crame,
              firearms_registration: particular.firearms_registration,
            }
          }),
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
          handleShowCreate={() => handleDialogOpen('create_particulars')}
        />
      )
    } else if (index === 2) {
      const rows = discountListData?.data?.map((discount: any) => {
        return {
          id: discount?.id,
          discount_name: discount?.discount_name,
          percent: discount?.percent ?? 0,
          requires_card_no: discount?.requires_card_no,
          percent_str: discount?.percent
            ? `${String(discount?.percent.toFixed(2))}%`
            : 0.0,
          requires_card_no_str: discount?.requires_card_no ? 'Yes' : 'No',
          is_active: discount?.is_active,
          status: discount?.is_active ? 'Active' : 'Inactive',
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
          handleShowCreate={() => handleDialogOpen('create_discounts')}
        />
      )
    } else if (index === 3) {
      const rows = signatoryListData?.data?.map((signatory: any) => {
        return {
          id: signatory.id,
          signatory_name: signatory?.signatory_name,
          report_module: JSON.parse(signatory?.report_module),
          is_active: signatory?.is_active,
          status: signatory?.is_active ? 'Active' : 'Inactive',
        }
      })
      const currentPage = signatoryListData?.current_page
      const nextPageUrl = signatoryListData?.next_page_url
      const prevPageUrl = signatoryListData?.prev_page_url
      const from = signatoryListData?.from
      const to = signatoryListData?.to
      const total = signatoryListData?.total
      const links = signatoryListData?.links

      return (
        <SignatoryList
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
          handleShowCreate={() => handleDialogOpen('create_signatories')}
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
          handleShowCreate={() => handleDialogOpen('create_paper_sizes')}
        />
      )
    }  else if (index === 5) {
      const rows = accountListData?.data?.map((account: any) => {
        return {
          id: account.id,
          account_name: account?.account_name,
          account_number: account?.account_number
        }
      })
      const currentPage = accountListData?.current_page
      const nextPageUrl = accountListData?.next_page_url
      const prevPageUrl = accountListData?.prev_page_url
      const from = accountListData?.from
      const to = accountListData?.to
      const total = accountListData?.total
      const links = accountListData?.links

      return (
        <AccountList
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
          handleShowCreate={() => handleDialogOpen('create_accounts')}
        />
      )
    }
  }

  const currentHandleClear = () => {
    switch (tabValue) {
      case 0:
        setCategoryFormData(defaultCategoryFormData)
        break
      case 1:
        setParticularFormData(defaultParticularFormData)
        break
      case 2:
        setDiscountFormData(defaultDiscountFormData)
        break
      case 3:
        setSignatoryFormData(defaultSignatoryFormData)
        break
      case 4:
        setPaperSizeFormData(defaultPaperSizeFormData)
        break
      case 5:
        setAccountFormData(defaultAccountFormData)
        break
      default:
        break
    }
  }

  const currentHandleInputChange = (param1: any, param2: any = undefined) => {
    switch (tabValue) {
      case 0:
        handleInputChangeCategories(param1)
        break
      case 1:
        handleInputChangeParticulars(param1, param2)
        break
      case 2:
        handleInputChangeDiscounts(param1)
        break
      case 3:
        handleInputChangeSignatories(param1, param2)
        break
      case 4:
        handleInputChangePaperSizes(param1)
        break
      case 5:
        handleInputChangeAccounts(param1)
        break
      default:
        break
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
      <SystemDialog
        open={dialogOpen[currentCreateDialog] ?? false}
        title={currentCreateTitle}
        dialogType='create'
        content={currentContent}
        formData={currentFormData}
        handleInputChange={currentHandleInputChange}
        handleClose={() => handleDialogClose(currentCreateDialog)}
        handleClear={currentHandleClear}
        handleCreate={handleCreateRecord}
      />
      <SystemDialog
        open={dialogOpen[currentUpdateDialog] ?? false}
        title={currentUpdateTitle}
        dialogType='update'
        content={currentContent}
        formData={currentFormData}
        handleInputChange={currentHandleInputChange}
        handleClose={() => handleDialogClose(currentUpdateDialog)}
        handleClear={() => currentHandleClear()}
        handleUpdate={handleUpdateRecord}
        handleShowDelete={() => handleDialogOpen(currentDeleteDialog)}
      />
      <SystemDialog
        open={dialogOpen[currentDeleteDialog] ?? false}
        title={currentDeleteTitle}
        dialogType='delete'
        id={currentFormData?.id}
        handleClose={() => handleDialogClose(currentDeleteDialog)}
        handleDelete={handleDeleteRecord}
      />
    </MiniVariantDrawer>
  )
}

export default Library
