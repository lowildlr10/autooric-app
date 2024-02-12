import React from 'react'
import { TextField } from '@mui/material'
import { ITableListActionSectionSearchProps } from '@/Interfaces'

const SearchField = ({
  search,
  loading,
  handleChange,
}: ITableListActionSectionSearchProps) => {
  return (
    <TextField
      type='search'
      variant='outlined'
      label={loading ? 'Searching...' : 'Search'}
      size='small'
      focused
      sx={{
        width: 250,
        minWidth: 200,
      }}
      value={search}
      onChange={handleChange}
    />
  )
}

export default SearchField
