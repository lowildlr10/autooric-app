import React, { useEffect, useState } from 'react'
import TableList from '../TableList'
import { IOfficialReceipt, IOrColumn, IOrListProps } from '@/Interfaces'
import CreateOr from './CreateOr'

const columns: readonly IOrColumn[] = [
  { id: 'receipt_date', label: 'Date', minWidth: 90 },
  { id: 'or_no', label: 'OR No.', minWidth: 90 },
  { id: 'payor', label: 'Payor', minWidth: 180 },
  { id: 'nature_collection', label: 'Nature of Collection', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 90, align: 'right'},
  { id: 'amount', label: 'Amount', minWidth: 80, align: 'right'}
]

const OrList = ({
  personelName,
  rows,
  currentPage,
  nextPageUrl,
  prevPageUrl,
  from,
  to,
  total,
  links,
  handlePageChange
}: IOrListProps) => {
  const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [details, setDetails] = useState<IOfficialReceipt | undefined>({})
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (search.trim()) {
      setSearchLoading(true)
      const timer = setTimeout(() => {
        handlePageChange(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/official-receipts?search=${search.trim()}`
        )
        setSearchLoading(false)  
      }, 500)

      return () => clearTimeout(timer)
    } else {
      handlePageChange('')
      setSearchLoading(false)
    }
  }, [search])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleShowDetails = (id: string) => {
    setDetails(
      rows?.find((row: IOfficialReceipt) => row.id === id)
    )
    setShowDetails(true)
  }

  const handleClose = () => {
    setShowDetails(false)
    setDetails({})
  }

  if (showDetails) {
    return (
      <CreateOr 
        personelName={personelName}
        formData={details ?? {}}
        readOnly={showDetails}
        handleClose={handleClose}
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
      handleShowDetails={handleShowDetails}
    />
  )
}

export default OrList