import React from 'react'
import { ITableListPaginationProps } from '@/Interfaces'
import { Pagination, Stack, Typography } from '@mui/material'

const TableListPagination = ({
  search,
  currentPage,
  nextPageUrl,
  prevPageUrl,
  from,
  to,
  total,
  links,
  handlePageChange,
}: ITableListPaginationProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const additionalQuery = search ? `&search=${search}` : ''
    const url = links[value]?.url ?? ''
    handlePageChange(url + additionalQuery)
  }

  return (
    <Stack spacing={2} alignItems='center' my={3} px={2}>
      <Typography variant='body2' width='100%' textAlign='right'>
        Displaying: {from} - {to} of {total}
      </Typography>
      <Pagination
        page={currentPage ?? 1}
        count={links?.length ? links?.length - 2 : 0}
        color='primary'
        showFirstButton={!!prevPageUrl}
        showLastButton={!!nextPageUrl}
        size='small'
        onChange={handleChange}
      />
    </Stack>
  )
}

export default TableListPagination
