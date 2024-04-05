import React, { useEffect, useState } from 'react'
import TableList from '@/components/TableList'
import {
  IPaperSize,
  IPaperSizeListProps,
  IPaperSizeListColumn,
} from '@/Interfaces'

const columns: readonly IPaperSizeListColumn[] = [
  { id: 'paper_name', label: 'Paper Name', minWidth: 200 },
  { id: 'width_str', label: 'Width', minWidth: 90 },
  { id: 'height_str', label: 'Height', minWidth: 90 },
]

const PapeSizeList = ({
  rows,
  loading,
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
}: IPaperSizeListProps) => {
  const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(true)

  useEffect(() => {
    if (!searchLoading) return
    const query = search.trim() ?? ''
    if (query) {
      const timer = setTimeout(() => {
        handlePageChange(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/paper-sizes-paginated?search=${query}`
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
      loading={loading}
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
        handleShowDetails(rows?.find((row: IPaperSize) => row.id === id) ?? {})
      }
      handleShowCreate={handleShowCreate}
    />
  )
}

export default PapeSizeList
