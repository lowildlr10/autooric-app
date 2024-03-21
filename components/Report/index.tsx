'use client'
import React, { useEffect, useState } from 'react'
import useAccessToken from '@/hooks/useAccessToken'
import useUserInfo from '@/hooks/useUserInfo'
import { Stack } from '@mui/material'
import MiniVariantDrawer from '@/components/Drawer/MiniVariantDrawer'
import Loader from '@/components/Loader'
import {
  ICashReceiptsRecord,
  IOpenDialog,
  IPrintEReceipts,
  IReportCollection,
  ISummaryFees,
  ITabContents,
  OpenDialogType,
} from '@/Interfaces'
import CardContainer from '@/components/CardContainer'
import TabContainer, { CustomTabPanel } from '@/components/TabContainer'
import toast from 'react-hot-toast'
import API from '@/utilities/API'
import SystemDialog from '../SystemDialog'
import CashReceiptsRecord from './CashReceiptsRecord'
import ReportCollection from './ReportCollection'
import SummaryFees from './SummaryFees'
import PrintEReceipts from './PrintEReceipts'

const defaultCashReceiptData: ICashReceiptsRecord = {
  from: undefined,
  to: undefined,
  particulars_ids: [],
  certified_correct_id: '',
  paper_size_id: '',
}

const defaultReportCollectionData: IReportCollection = {
  from: undefined,
  to: undefined,
  category_ids: [],
  certified_correct_id: '',
  noted_by_id: '',
  paper_size_id: '',
}

const defaultSummaryFeesData: ISummaryFees = {
  from: undefined,
  to: undefined,
  category_ids: [],
  paper_size_id: '',
}

const defaultPrintEReceiptsData: IPrintEReceipts = {
  from: undefined,
  to: undefined,
  particulars_ids: [],
  paper_size_id: '',
}

const Report = () => {
  const { accessToken, forceRelogin } = useAccessToken()
  const { userInfo, isAuthenticated, userLoading } = useUserInfo(
    accessToken ?? ''
  )
  const [loading, setLoading] = useState(true)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [categoryListLoading, setCategoryListLoading] = useState(false)
  const [particularListLoading, setParticularListLoading] = useState(false)
  const [signatoryListLoading, setSignatoryListLoading] = useState(false)
  const [paperSizeListLoading, setPaperSizeListLoading] = useState(false)
  const [printDownloadLoading, setPrintDownloadLoading] = useState(false)
  const [printUrl, setPrintUrl] = useState('')
  const [printFilename, setPrintFilename] = useState('')
  const [currentPrintTitle, setCurrentPrintTitle] = useState('')
  const [categoryListData, setCategoryListData] = useState<any>()
  const [particularListData, setParticularListData] = useState<any>()
  const [signatoryListData, setSignatoryListData] = useState<any>()
  const [paperSizeListData, setPaperSizeListData] = useState<any>()
  const [rocPrintPreviewData, setRocPrintPreviewData] = useState<any>(null)
  const [cashReceiptData, setCashReceiptData] = useState<ICashReceiptsRecord>(
    defaultCashReceiptData
  )
  const [reportCollectionData, setReportCollectionData] =
    useState<IReportCollection>(defaultReportCollectionData)
  const [summaryFeesData, setSummaryFeesData] = useState<ISummaryFees>(
    defaultSummaryFeesData
  )
  const [printEReceiptsData, setPrintEReceiptsData] = useState<IPrintEReceipts>(
    defaultPrintEReceiptsData
  )
  const [tabValue, setTabValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState<IOpenDialog>({})
  const [tabContents, setTabContents] = useState<ITabContents[]>([])

  // Handle global loading
  useEffect(() => {
    if (
      userLoading ||
      logoutLoading ||
      categoryListLoading ||
      particularListLoading ||
      signatoryListLoading ||
      paperSizeListLoading ||
      printDownloadLoading
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
    signatoryListLoading,
    paperSizeListLoading,
    printDownloadLoading,
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
        label: 'CASH RECEIPTS RECORD',
      },
      {
        index: 1,
        label: 'REPORT OF COLLECTION',
      },
      {
        index: 2,
        label: 'SUMMARY OF FEES',
      },
      {
        index: 3,
        label: 'PRINT E-RECEIPTS',
      },
    ])
  }, [])

  useEffect(() => {
    handleClearAll()

    switch (tabValue) {
      case 0:
        setCurrentPrintTitle('Print Cash Receipts Record')
        if (accessToken) {
          fetchParticulars()
          fetchSignatories()
          fetchPaperSizes()
        }
        break
      case 1:
        setCurrentPrintTitle('Print Report of Collection')
        if (accessToken) {
          fetchCategories()
          fetchSignatories()
          fetchPaperSizes()
        }
        break
      case 2:
        setCurrentPrintTitle('Print Summary Fees')
        if (accessToken) {
          fetchCategories()
          fetchPaperSizes()
        }
        break
      case 3:
        setCurrentPrintTitle('Print E-Receipts')
        if (accessToken) {
          fetchPaperSizes()
        }
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

  const handleClearAll = () => {
    setCashReceiptData(defaultCashReceiptData)
    setReportCollectionData(defaultReportCollectionData)
    setSummaryFeesData(defaultSummaryFeesData)
    setPrintEReceiptsData(defaultPrintEReceiptsData)
    setRocPrintPreviewData(null)
  }

  const handleRocInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const nameArr = name.split('_')
    const updatedData = {...rocPrintPreviewData}
    updatedData.categories[nameArr[1]].particulars[nameArr[2]].remarks = value;
    setRocPrintPreviewData(updatedData);
  }

  const handleReportDataChange = (
    name: string,
    value: string | string[] | null | undefined
  ) => {
    switch (tabValue) {
      case 0:
        setCashReceiptData({
          ...cashReceiptData,
          [name]: value,
        })
        break
      case 1:
        setReportCollectionData({
          ...reportCollectionData,
          [name]: value,
        })
        break
      case 2:
        setSummaryFeesData({
          ...summaryFeesData,
          [name]: value,
        })
        break
      case 3:
        setPrintEReceiptsData({
          ...printEReceiptsData,
          [name]: value,
        })
        break
      default:
        break
    }
  }

  const handleDownloadPdf = (filename: string, blob: string) => {
    const link = document.createElement('a')
    link.href = blob
    link.download = filename
    link.click()
  }

  //Handle print report
  const handlePrint = () => {
    setPrintDownloadLoading(true)

    if (!handleValidate()) {
      setPrintDownloadLoading(false)
      return
    }

    if (accessToken) {
      switch (tabValue) {
        case 0:
          API.getPrintableCrr(
            accessToken,
            cashReceiptData.from ?? '',
            cashReceiptData.to ?? '',
            JSON.stringify(cashReceiptData.particulars_ids),
            cashReceiptData.certified_correct_id,
            cashReceiptData.paper_size_id
          )
            .then((response) => {
              const pdfUrl = `data:application/pdf;base64,${response.data.data.pdf}`
              const filename = response.data.data.filename
              setPrintFilename(filename)
              setPrintUrl(pdfUrl)
              handleDialogOpen('print')
              setPrintDownloadLoading(false)
            })
            .catch((error) => {
              toast.error(error.message)
              setPrintDownloadLoading(false)
            })
          break
        case 1:
          if (!rocPrintPreviewData) {
            API.getPrintableRocPreviewData(
              accessToken,
              reportCollectionData.from ?? '',
              reportCollectionData.to ?? '',
              JSON.stringify(reportCollectionData.category_ids),
              reportCollectionData.certified_correct_id,
              reportCollectionData.noted_by_id,
              reportCollectionData.paper_size_id
            )
              .then((response) => {
                const data = response.data.data;
                setRocPrintPreviewData(data.data)
                handleDialogOpen('print_preview')
                setPrintDownloadLoading(false)
              })
              .catch((error) => {
                toast.error(error.data.message)
                setPrintDownloadLoading(false)
              })
          } else {
            API.getPrintableRoc(
              accessToken,
              JSON.stringify(rocPrintPreviewData)
            )
              .then((response) => {
                const pdfUrl = `data:application/pdf;base64,${response.data.data.pdf}`
                const filename = response.data.data.filename
                setPrintFilename(filename)
                setPrintUrl(pdfUrl)
                handleDialogOpen('print')
                setPrintDownloadLoading(false)
              })
              .catch((error) => {
                toast.error(error.data.message)
                setPrintDownloadLoading(false)
              })
          }
          break
        case 2:
          API.getPrintableSof(
            accessToken,
            summaryFeesData.from ?? '',
            summaryFeesData.to ?? '',
            JSON.stringify(summaryFeesData.category_ids),
            summaryFeesData.paper_size_id
          )
            .then((response) => {
              const pdfUrl = `data:application/pdf;base64,${response.data.data.pdf}`
              const filename = response.data.data.filename
              setPrintFilename(filename)
              setPrintUrl(pdfUrl)
              handleDialogOpen('print')
              setPrintDownloadLoading(false)
            })
            .catch((error) => {
              toast.error(error.message)
              setPrintDownloadLoading(false)
            })
          break
        case 3:
          API.getPrintableEReceipts(
            accessToken,
            printEReceiptsData.from ?? '',
            printEReceiptsData.to ?? '',
            JSON.stringify(printEReceiptsData.particulars_ids),
            printEReceiptsData.paper_size_id
          )
            .then((response) => {
              const pdfUrl = `data:application/pdf;base64,${response.data.data.pdf}`
              const filename = response.data.data.filename
              setPrintFilename(filename)
              setPrintUrl(pdfUrl)
              handleDialogOpen('print')
              setPrintDownloadLoading(false)
            })
            .catch((error) => {
              toast.error(error.message)
              setPrintDownloadLoading(false)
            })
          break
        default:
          break
      }
    } else {
      toast.error(
        'An error occurred while fetching printable report. Please try again.'
      )
      setPrintDownloadLoading(false)
    }
  }

  const handleValidate = () => {
    switch (tabValue) {
      case 0:
        if (
          !!cashReceiptData.from === false ||
          !!cashReceiptData.to === false ||
          cashReceiptData.particulars_ids.length === 0 ||
          !!cashReceiptData.certified_correct_id === false ||
          !!cashReceiptData.paper_size_id === false
        ) {
          toast.error('Input all required fields.')
          return false
        }
        break
      case 1:
        if (
          !!reportCollectionData.from === false ||
          !!reportCollectionData.to === false ||
          reportCollectionData.category_ids.length === 0 ||
          !!reportCollectionData.certified_correct_id === false ||
          !!reportCollectionData.noted_by_id === false ||
          !!reportCollectionData.paper_size_id === false
        ) {
          toast.error('Input all required fields.')
          return false
        }
        break
      case 2:
        if (
          !!summaryFeesData.from === false ||
          !!summaryFeesData.to === false ||
          summaryFeesData.category_ids.length === 0 ||
          !!summaryFeesData.paper_size_id === false
        ) {
          toast.error('Input all required fields.')
          return false
        }
        break
      case 3:
        if (
          !!printEReceiptsData.from === false ||
          !!printEReceiptsData.to === false ||
          printEReceiptsData.particulars_ids.length === 0 ||
          !!printEReceiptsData.paper_size_id === false
        ) {
          toast.error('Input all required fields.')
          return false
        }
        break
      default:
        break
    }

    return true
  }

  const dynamicTabContents = (index: number) => {
    if (index === 0) {
      return (
        <CashReceiptsRecord
          particulars={particularListData}
          signatories={signatoryListData}
          paperSizes={paperSizeListData}
          inputData={cashReceiptData}
          handleInputChange={handleReportDataChange}
          handlePrint={handlePrint}
        />
      )
    } else if (index === 1) {
      return (
        <ReportCollection
          categories={categoryListData}
          signatories={signatoryListData}
          paperSizes={paperSizeListData}
          inputData={reportCollectionData}
          handleInputChange={handleReportDataChange}
          handlePrint={handlePrint}
        />
      )
    } else if (index === 2) {
      return (
        <SummaryFees
          categories={categoryListData}
          paperSizes={paperSizeListData}
          inputData={summaryFeesData}
          handleInputChange={handleReportDataChange}
          handlePrint={handlePrint}
        />
      )
    } else if (index === 3) {
      return (
        <PrintEReceipts
          particulars={particularListData}
          paperSizes={paperSizeListData}
          inputData={printEReceiptsData}
          handleInputChange={handleReportDataChange}
          handlePrint={handlePrint}
        />
      )
    }
  }

  // Fetch categories
  const fetchCategories = (url?: string) => {
    setCategoryListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching lists. Please try again.'

      API.getCategories(accessToken)
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

  // Fetch particulars
  const fetchParticulars = () => {
    setParticularListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching lists. Please try again.'

      API.getParticulars(accessToken)
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

  // Fetch signatories
  const fetchSignatories = () => {
    setSignatoryListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching lists. Please try again.'

      API.getSignatories(accessToken)
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

  // Fetch paper sizes
  const fetchPaperSizes = () => {
    setPaperSizeListLoading(true)
    if (accessToken) {
      const errorMessage =
        'An error occurred while fetching lists. Please try again.'

      API.getPaperSizes(accessToken)
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
        <CardContainer title='Report'>
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
        title={currentPrintTitle}
        dialogType='print'
        printUrl={printUrl}
        handleClose={() => handleDialogClose('print')}
        handleDownload={() => handleDownloadPdf(printFilename, printUrl)}
        handleClear={() => setPrintUrl('')}
      />
      <SystemDialog
        open={dialogOpen.print_preview ?? false}
        title={'Report Collection Preview'}
        dialogType='print_preview'
        content='print_report_collection'
        handleClose={() => handleDialogClose('print_preview')}
        handlePrint={handlePrint}
        formData={rocPrintPreviewData}
        handleClear={() => setRocPrintPreviewData(null)}
        handleInputChange={handleRocInputChange}
      />
    </MiniVariantDrawer>
  )
}

export default Report
