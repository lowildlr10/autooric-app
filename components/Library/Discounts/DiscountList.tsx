import React, { useEffect, useState } from 'react'
import TableList from '@/components/TableList'
import {
  IDiscount,
  IDiscountListProps,
  IDiscountListColumn,
} from '@/Interfaces'

const columns: readonly IDiscountListColumn[] = [
  { id: 'discount_name', label: 'Discount Name', minWidth: 200 },
  { id: 'percent_str', label: 'Percentage', minWidth: 90 },
  { id: 'requires_card_no_str', label: 'Requires ID/Card No?', minWidth: 90 },
  { id: 'status', label: 'Status', minWidth: 90, align: 'center' },
]

const DiscountList = ({
  rows,
  currentPage,
  nextPageUrl,
  prevPageUrl,
  from,
  to,
  total,
  links,
  handlePageChange,
  handleShowDetails,
  handleShowCreate,
}: IDiscountListProps) => {
  const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(true)

  useEffect(() => {
    if (!searchLoading) return
    const query = search.trim() ?? ''
    if (query) {
      const timer = setTimeout(() => {
        handlePageChange(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/discounts-paginated?search=${query}`
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
    setSearch(e.target.value ?? '')
  }

  return (
    <TableList
      search={search}
      searchType='search'
      displayType='users'
      columns={columns}
      rows={rows ?? []}
      currentPage={currentPage ?? 1}
      nextPageUrl={nextPageUrl}
      prevPageUrl={prevPageUrl}
      from={from ?? 0}
      to={to ?? 0}
      total={total ?? 0}
      links={links}
      hasCreateButton
      searchLoading={searchLoading}
      handleSearchChange={handleSearchChange}
      handlePageChange={handlePageChange}
      handleShowDetails={(id: string) =>
        handleShowDetails(rows?.find((row: IDiscount) => row.id === id) ?? {})
      }
      handleShowCreate={handleShowCreate}
    />
  )
}

export default DiscountList
