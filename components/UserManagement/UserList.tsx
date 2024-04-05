import React, { useEffect, useState } from 'react'
import TableList from '../TableList'
import { IUser, IUserListProps, IUserListColumn } from '@/Interfaces'

const columns: readonly IUserListColumn[] = [
  { id: 'fullname', label: 'Name', minWidth: 200 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'phone_str', label: 'Phone', minWidth: 150 },
  { id: 'position', label: 'Position', minWidth: 150 },
  { id: 'designation', label: 'Designation', minWidth: 150 },
  { id: 'station', label: 'Station', minWidth: 150 },
  { id: 'role_str', label: 'Role', minWidth: 90, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 90, align: 'center' },
]

const UserList = ({
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
}: IUserListProps) => {
  const [search, setSearch] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    if (!searchLoading) return
    const query = search.trim() ?? ''
    if (query) {
      const timer = setTimeout(() => {
        handlePageChange(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user-management/users?search=${query}`
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
        handleShowDetails(rows?.find((row: IUser) => row.id === id) ?? {})
      }
      handleShowCreate={handleShowCreate}
    />
  )
}

export default UserList
