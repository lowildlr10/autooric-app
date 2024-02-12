import React from 'react'
import { ITableListPaginationProps } from '@/Interfaces'
import { Pagination, Stack, Typography } from '@mui/material'

const TableListPagination = ({
  currentPage,
  nextPageUrl,
  prevPageUrl,
  from,
  to,
  total,
  links,
  handlePageChange
}: ITableListPaginationProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePageChange(links[value]?.url ?? '')
  }

  return (
    <Stack spacing={2} alignItems='center' my={3} px={2}>
      <Typography variant='body2' width='100%' textAlign='right'
      >Displaying: {from} - {to} of {total}</Typography>
      <Pagination
        page={currentPage ?? 1}
        count={links?.length ? links?.length - 2 : 0} 
        color="primary" 
        showFirstButton={!!prevPageUrl}
        showLastButton={!!nextPageUrl}
        size='small'
        onChange={handleChange}
      />
    </Stack>
  )
}

export default TableListPagination