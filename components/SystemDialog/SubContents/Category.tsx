import React from 'react'
import { ICategoriesSubContentProps } from '@/Interfaces'
import { TextField } from '@mui/material'

const Category = ({
  formData,
  dialogType,
  handleInputChange,
}: ICategoriesSubContentProps) => {
  return (
    <>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='?.category_name'
        label='Category Name'
        name='?.category_name'
        autoComplete=''
        size='small'
        focused
        autoFocus
        value={formData?.category_name ?? ''}
        onChange={handleInputChange}
      />

      {dialogType === 'update' && (
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='order_no'
          label='Order No.'
          name='order_no'
          autoComplete=''
          size='small'
          focused
          sx={{ m: 0 }}
          value={formData?.order_no ?? 0}
          InputProps={{
            type: 'number',
          }}
          onChange={handleInputChange}
        />
      )}
    </>
  )
}

export default Category
