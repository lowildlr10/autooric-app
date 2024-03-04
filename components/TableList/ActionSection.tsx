import { Button, Stack } from '@mui/material'
import React from 'react'
import SearchField from './SearchField'
import { ITableListActionSectionProps } from '@/Interfaces'
import DateRangeParticulars from './DateRangeParticulars'

const ActionSection = ({
  search,
  searchType = 'search',
  handleSearchChange,
  searchLoading,
  hasCreateButton,
  handleShowCreate,
}: ITableListActionSectionProps) => {
  return (
    <Stack direction='row' justifyContent='space-between' my={2}>
      {hasCreateButton && (
        <Button
          variant='contained'
          size='small'
          onClick={handleShowCreate}
          sx={{ px: 2 }}
        >
          Create
        </Button>
      )}
      {!hasCreateButton && <div></div>}

      {searchType === 'search' && (
        <SearchField
          search={search}
          loading={searchLoading}
          handleChange={handleSearchChange}
        />
      )}

      {searchType === 'date_particulars' && (
        <DateRangeParticulars
          search={search}
          loading={searchLoading}
          handleChange={handleSearchChange}
        />
      )}
    </Stack>
  )
}

export default ActionSection
