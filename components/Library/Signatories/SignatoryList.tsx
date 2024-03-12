import React, { useEffect, useState } from 'react'
import TableList from '@/components/TableList'
import {
  ISignatory,
  ISignatoryListProps,
  ISignatoryListColumn,
} from '@/Interfaces'

const columns: readonly ISignatoryListColumn[] = [
  { id: 'signatory_name', label: 'Signatory Name', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 90 },
]

const SignatoryList = ({
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
}: ISignatoryListProps) => {
  const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    if (!searchLoading) return
    const query = search.trim() ?? ''
    if (query) {
      const timer = setTimeout(() => {
        handlePageChange(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/signatories-paginated?search=${query}`
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
        handleShowDetails(rows?.find((row: ISignatory) => row.id === id) ?? {})
      }
      handleShowCreate={handleShowCreate}
    />
  )
}

export default SignatoryList
