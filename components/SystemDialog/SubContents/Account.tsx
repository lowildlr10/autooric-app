import React from 'react'
import { IAccountsSubContentProps } from '@/Interfaces'
import { TextField } from '@mui/material'

const Account = ({
  formData,
  handleInputChange,
}: IAccountsSubContentProps) => {
  return (
    <>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='account_name'
        label='Account Name'
        name='account_name'
        autoComplete=''
        size='small'
        focused
        autoFocus
        value={formData?.account_name ?? ''}
        onChange={handleInputChange}
      />

      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        id='account_number'
        label='Account Number'
        name='account_number'
        autoComplete=''
        size='small'
        focused
        sx={{ m: 0 }}
        value={formData?.account_number ?? ''}
        onChange={handleInputChange}
      />
    </>
  )
}

export default Account
