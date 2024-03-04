'use client'
import React, { useState, useEffect } from 'react'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ActionSection from './ActionSection'
import { ITableListProps } from '@/Interfaces'
import TableListPagination from './TableListPagination'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ClassIcon from '@mui/icons-material/Class'
import { grey } from '@mui/material/colors'

const TableList = ({
  search,
  hasCreateButton = false,
  columns,
  subColumns,
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
  handleShowCreate,
}: ITableListProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = useState<any>({})

  useEffect(() => {
    setOpen({
      ...open,
      [`dd_${rows[0]?.id}`]: true,
    })
  }, [rows])

  const handleToggleDropdown = (dropdownName: string) => {
    setOpen({
      ...open,
      [dropdownName]: !!open[dropdownName] === true ? false : true,
    })
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
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
                    width: column.minWidth,
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
                <React.Fragment key={row.id}>
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    {columns.map((column: any, index: number) => {
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
                        <React.Fragment key={`${row.id}-${column.id}`}>
                          {column.id === 'dropdown' ? (
                            <TableCell
                              key={`${row.id}-${column.id}`}
                              align={column.align}
                              sx={{
                                cursor: 'pointer',
                                color,
                                fontWeight: 'bold',
                              }}
                            >
                              <IconButton
                                aria-label='expand row'
                                size='small'
                                onClick={() =>
                                  handleToggleDropdown(`dd_${row.id}`)
                                }
                              >
                                {open[`dd_${row.id}`] ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </IconButton>
                            </TableCell>
                          ) : (
                            <TableCell
                              key={`${row.id}-${column.id}`}
                              align={column.align}
                              sx={{
                                cursor: 'pointer',
                                color,
                                fontWeight: !!subColumns ? 'bold' : 'normal',
                                fontSize: !!subColumns ? '1rem' : 'initial',
                              }}
                              onClick={() =>
                                !!subColumns === true
                                  ? handleToggleDropdown(`dd_${row.id}`)
                                  : handleShowDetails &&
                                    handleShowDetails(row?.id ?? '')
                              }
                            >
                              {!!subColumns === true && (
                                <ClassIcon fontSize='small' />
                              )}
                              &nbsp;{value}
                            </TableCell>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </TableRow>

                  {!!subColumns === true && (
                    <TableRow key={`subrow_${row.id}`}>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse
                          in={open[`dd_${row.id}`]}
                          timeout='auto'
                          unmountOnExit
                        >
                          <Table size={isMobile ? 'small' : 'medium'}>
                            <TableHead>
                              <TableRow>
                                {subColumns.map((subColumn: any) => (
                                  <TableCell
                                    key={subColumn.id}
                                    align={subColumn.align}
                                    style={{
                                      minWidth: subColumn.minWidth,
                                      width: subColumn.minWidth,
                                      background: grey[100],
                                    }}
                                  >
                                    {subColumn.label}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row?.sub_rows && row?.sub_rows?.length === 0 && (
                                <TableRow hover role='checkbox' tabIndex={-1}>
                                  <TableCell
                                    align='center'
                                    sx={{
                                      cursor: 'pointer',
                                      color: 'error.main',
                                    }}
                                    colSpan={subColumns?.length}
                                  >
                                    No data.
                                  </TableCell>
                                </TableRow>
                              )}
                              {row?.sub_rows?.map((subRow: any) => (
                                <TableRow key={`${row.id}-${subRow.id}`}>
                                  {subColumns.map((subColumn: any) => {
                                    const value = subRow[subColumn.id]

                                    return (
                                      <TableCell
                                        key={`${subRow.id}-${subColumn.id}`}
                                        align={subColumn.align}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() =>
                                          handleShowDetails &&
                                          handleShowDetails(subRow?.id ?? '')
                                        }
                                      >
                                        {value}
                                      </TableCell>
                                    )
                                  })}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
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
