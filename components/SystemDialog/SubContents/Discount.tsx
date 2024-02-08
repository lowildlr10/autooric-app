import React from 'react'
import { IDiscountsSubContentProps } from '@/Interfaces'
import { TextField } from '@mui/material'

const Discount = ({
  formData,
  handleInputChange
}: IDiscountsSubContentProps) => {
  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="discount_name"
        label="Discount Name"
        name="discount_name"
        autoComplete=""
        size='small'
        focused
        autoFocus
        value={formData?.discount_name ?? ''}
        onChange={handleInputChange}
        sx={{ m: 0 }}
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="percent"
        label="Percentage"
        name="percent"
        autoComplete=""
        size='small'
        focused
        autoFocus
        value={formData?.percent ?? ''}
        onChange={handleInputChange}
        sx={{ m: 0 }}
      />
    </>
  )
}

export default Discount