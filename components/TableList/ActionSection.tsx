import { Button, Stack } from '@mui/material'
import React from 'react'
import SearchField from './SearchField'
import { ITableListActionSectionProps } from '@/Interfaces'

const ActionSection = ({
  search,
  handleSearchChange,
  searchLoading,
  hasCreateButton,
  handleCreate,
}: ITableListActionSectionProps) => {
  return (
    <Stack direction='row' justifyContent='space-between' my={2}>
      {hasCreateButton && (
        <Button variant='contained' onClick={handleCreate}>
          Create
        </Button>
      )}
      {!hasCreateButton && <div></div>}
      <SearchField
        search={search}
        loading={searchLoading}
        handleChange={handleSearchChange}
      />
    </Stack>
  )
}

export default ActionSection
