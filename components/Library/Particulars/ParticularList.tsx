import React, { useEffect, useState } from 'react'
import TableList from '@/components/TableList' 
import { IParticular, IParticularListProps, IParticularListColumn } from '@/Interfaces'

const columns: readonly IParticularListColumn[] = [
  { id: 'particular_name', label: 'Particular Name', minWidth: 200 },
  { id: 'category_str', label: 'Category', minWidth: 200 },
  { id: 'default_amount_str', label: 'Default Amount', minWidth: 150 },
  { id: 'order_no', label: 'Order No', minWidth: 90 },
]

const ParticularList = ({
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
  handleShowCreate
}: IParticularListProps) => {
  const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    if (!searchLoading) return
    const query = search.trim() ?? ''
    if (query) {
      const timer = setTimeout(() => {
        handlePageChange(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/particulars-paginated?search=${query}`
        )
        setSearchLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      handlePageChange('')
      setSearchLoading(false)
    }
  }, [search, searchLoading])

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        handleShowDetails(
          rows?.find((row: IParticular) => row.id === id) ?? {}
        )
      }
      handleShowCreate={handleShowCreate}
    />
  )
}

export default ParticularList
