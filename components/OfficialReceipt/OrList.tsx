import React, { useEffect, useState } from 'react'
import TableList from '../TableList'
import { IOfficialReceipt, IOrColumn, IOrListProps } from '@/Interfaces'
import CreateOr from './CreateOr'

const columns: readonly IOrColumn[] = [
  { id: 'receipt_date', label: 'Date', minWidth: 90 },
  { id: 'or_no', label: 'OR No.', minWidth: 90 },
  { id: 'payor', label: 'Payor', minWidth: 180 },
  { id: 'nature_collection', label: 'Nature of Collection', minWidth: 150 },
  { id: 'amount_str', label: 'Amount', minWidth: 80, align: 'right' },
  { id: 'deposit_str', label: 'Deposited', minWidth: 80, align: 'right' },
  { id: 'status', label: 'Status', minWidth: 90, align: 'center' },
]

const OrList = ({
  rows,
  loading,
  currentPage,
  nextPageUrl,
  prevPageUrl,
  from,
  to,
  total,
  links,
  showDetails,
  formData,
  details,
  paperSize,
  payors,
  discounts,
  particulars,
  enableUpdate,
  checkOrDuplicateLoading,
  checkOrDuplicateStatus,
  computingDiscount,
  discountLoading,
  particularLoading,
  payorLoading,
  handlePageChange,
  handleDeposit,
  handleCancel,
  handleShowDetails,
  handleCloseDetails,
  handlePrintDownloadOr,
  handleInputChange,
  handleEnableUpdate,
  handleDisableUpdate,
  handleUpdate,
}: IOrListProps) => {
  const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    if (!searchLoading) return
    const query = search.trim() ?? ''
    if (query) {
      const timer = setTimeout(() => {
        handlePageChange(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/official-receipts?search=${query}`
        )
        setSearchLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      handlePageChange('')
      setSearchLoading(false)
    }
  }, [search, searchLoading])

  const handleSearchDateParticularsChange = (value: string | null) => {
    setSearchLoading(true)
    setSearch(value ?? '')
  }

  if (showDetails) {
    return (
      <CreateOr
        personnelName={details?.accountable_personnel ?? ''}
        formData={enableUpdate ? formData ?? {} : details ?? {}}
        readOnly={showDetails}
        paperSize={paperSize}
        payors={payors ?? []}
        particulars={particulars ?? []}
        discounts={discounts ?? []}
        enableUpdate={enableUpdate}
        handleClose={handleCloseDetails}
        handleDeposit={handleDeposit}
        handleCancel={handleCancel}
        handlePrint={(orId, paperSizeId) =>
          handlePrintDownloadOr &&
          handlePrintDownloadOr(orId, paperSizeId, true)
        }
        handleInputChange={(input_name, value) =>
          handleInputChange && handleInputChange(input_name, value)
        }
        handleDisableUpdate={handleDisableUpdate}
        handleEnableUpdate={handleEnableUpdate}
        computingDiscount={computingDiscount}
        checkOrDuplicateLoading={checkOrDuplicateLoading}
        payorLoading={payorLoading}
        particularLoading={particularLoading}
        discountLoading={discountLoading}
        checkOrDuplicateStatus={checkOrDuplicateStatus}
        handleUpdate={handleUpdate}
      />
    )
  }

  return (
    <TableList
      search={search}
      loading={loading}
      searchType='date_particulars'
      displayType='official_receipt'
      columns={columns}
      rows={rows ?? []}
      currentPage={currentPage ?? 1}
      nextPageUrl={nextPageUrl}
      prevPageUrl={prevPageUrl}
      from={from ?? 0}
      to={to ?? 0}
      total={total ?? 0}
      links={links}
      searchLoading={searchLoading}
      handleSearchChange={handleSearchDateParticularsChange}
      handlePageChange={handlePageChange}
      handleShowDetails={(id: string) =>
        handleShowDetails(
          rows?.find((row: IOfficialReceipt) => row.id === id) ?? {}
        )
      }
    />
  )
}

export default OrList
