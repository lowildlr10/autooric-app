'use client'
import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ActionSection from './ActionSection'
import { ITableListProps } from '@/Interfaces'
import TableListPagination from './TableListPagination'

const TableList = ({
  search,
  hasCreateButton = false,
  columns,
  rows,
  currentPage,
  nextPageUrl,
  prevPageUrl,
  from,
  to,
  total,
  links,
  searchLoading,
  searchType,
  handleSearchChange,
  handlePageChange,
  handleShowDetails,
  handleShowCreate
}: ITableListProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <ActionSection
        search={search}
        hasCreateButton={hasCreateButton}
        searchType={searchType}
        searchLoading={searchLoading}
        handleSearchChange={handleSearchChange}
        handleShowCreate={handleShowCreate}
      />
      <TableContainer sx={{ height: 'calc(100vh - 30em)' }}>
        <Table
          stickyHeader
          aria-label='sticky table'
          size={isMobile ? 'small' : 'medium'}
        >
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ 
                    minWidth: column.minWidth,
                    width: column.minWidth 
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {total === 0 && (
              <TableRow hover role='checkbox' tabIndex={-1}>
                <TableCell
                  align='center'
                  sx={{ cursor: 'pointer', color: 'error.main' }}
                  colSpan={columns?.length}
                >
                  No data.
                </TableCell>
              </TableRow>
            )}
            {rows?.map((row: any) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map((column: any) => {
                    const value = row[column.id]
                    let color = 'text.primary'

                    if (column.id === 'status') {
                      if (value === 'Pending') color = 'gray'
                      if (value === 'Cancelled') color = 'error.main'
                      if (value === 'Deposited') color = 'secondary.main'
                      if (value === 'Active') color = 'secondary.main'
                      if (value === 'Inactive') color = 'error.main'
                    }

                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ 
                          cursor: 'pointer',
                          color,
                          fontWeight: typeof value === 'string' && value.includes('----') ? 'bold' : 'normal'
                        }}
                        onClick={() =>
                          handleShowDetails && handleShowDetails(row?.id ?? '')
                        }
                      >
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableListPagination
        search={search}
        currentPage={currentPage}
        nextPageUrl={nextPageUrl}
        prevPageUrl={prevPageUrl}
        from={from}
        to={to}
        total={total}
        links={links ?? []}
        handlePageChange={handlePageChange}
      />
    </Paper>
  )
}

export default TableList
