import React from 'react'
import { IDiscountsSubContentProps } from '@/Interfaces'
import { InputAdornment, TextField } from '@mui/material'

const Discount = ({
  formData,
  handleInputChange,
}: IDiscountsSubContentProps) => {
  return (
    <>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='discount_name'
        label='Discount Name'
        name='discount_name'
        autoComplete=''
        size='small'
        focused
        autoFocus
        value={formData?.discount_name ?? ''}
        onChange={handleInputChange}
      />

      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='percent'
        label='Percentage %'
        name='percent'
        autoComplete=''
        size='small'
        focused
        sx={{ m: 0 }}
        InputProps={{
          type: 'number',
          endAdornment: <InputAdornment position='end'>%</InputAdornment>,
        }}
        value={formData?.percent ?? ''}
        onChange={handleInputChange}
      />
    </>
  )
}

export default Discount
