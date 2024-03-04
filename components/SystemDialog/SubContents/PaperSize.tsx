import React from 'react'
import { IPaperSizesSubContentProps } from '@/Interfaces'
import { InputAdornment, TextField } from '@mui/material'

const PaperSize = ({
  formData,
  handleInputChange,
}: IPaperSizesSubContentProps) => {
  return (
    <>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='paper_name'
        label='Paper Name'
        name='paper_name'
        autoComplete=''
        size='small'
        focused
        autoFocus
        value={formData?.paper_name ?? ''}
        onChange={handleInputChange}
      />

      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='width'
        label='Width'
        name='width'
        autoComplete=''
        size='small'
        focused
        sx={{ m: 0 }}
        InputProps={{
          type: 'number',
          endAdornment: <InputAdornment position='end'>Inch</InputAdornment>,
        }}
        value={formData?.width ?? ''}
        onChange={handleInputChange}
      />

      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='height'
        label='Height'
        name='height'
        autoComplete=''
        size='small'
        focused
        sx={{ m: 0 }}
        InputProps={{
          type: 'number',
          endAdornment: <InputAdornment position='end'>Inch</InputAdornment>,
        }}
        value={formData?.height ?? ''}
        onChange={handleInputChange}
      />
    </>
  )
}

export default PaperSize
