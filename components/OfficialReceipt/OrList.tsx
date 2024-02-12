import React, { useEffect, useState } from 'react'
import TableList from '../TableList'
import { IOrColumn, IOrListProps } from '@/Interfaces'

const columns: readonly IOrColumn[] = [
  { id: 'receipt_date', label: 'Date', minWidth: 90 },
  { id: 'or_no', label: 'OR No.', minWidth: 90 },
  { id: 'payor', label: 'Payor', minWidth: 200 },
  { id: 'nature_collection', label: 'Nature of Collection', minWidth: 150 },
  { id: 'amount', label: 'Amount', minWidth: 80, align: 'right'},
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
  handlePageChange
}: IOrListProps) => {
  const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)

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
    />
  )
}

export default OrList