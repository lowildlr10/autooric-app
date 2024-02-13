import React, { use, useEffect, useState } from 'react'
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
  currentPage,
  nextPageUrl,
  prevPageUrl,
  from,
  to,
  total,
  links,
  showDetails,
  details,
  handlePageChange,
  handleDeposit,
  handleCancel,
  handleShowDetails,
  handleCloseDetails,
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLoading(true)
    setSearch(e.target.value)
  }

  if (showDetails) {
    return (
      <CreateOr
        personnelName={details?.accountable_personnel ?? ''}
        formData={details ?? {}}
        readOnly={showDetails}
        handleClose={handleCloseDetails}
        handleDeposit={handleDeposit}
        handleCancel={handleCancel}
      />
    )
  }

  return (
    <TableList
      search={search}
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
      handleSearchChange={handleSearchChange}
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
