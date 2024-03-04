import React from 'react'
import { IDiscountsSubContentProps } from '@/Interfaces'
import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
} from '@mui/material'

const Discount = ({
  formData,
  dialogType,
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

      <FormControl component='fieldset' variant='standard'>
        <FormControlLabel
          control={
            <Switch
              checked={!!formData?.requires_card_no ?? false}
              color='secondary'
              id='requires_card_no'
              name='requires_card_no'
              required
              inputProps={{ 'aria-label': 'controlled' }}
              onChange={handleInputChange}
            />
          }
          label='Requires ID/Card Number?'
          labelPlacement='start'
        />
      </FormControl>

      {dialogType === 'update' && (
        <FormControl component='fieldset' variant='standard'>
          <FormControlLabel
            control={
              <Switch
                checked={!!formData?.is_active ?? false}
                color='primary'
                id='is_active'
                name='is_active'
                required
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={handleInputChange}
              />
            }
            label='Is Active?'
            labelPlacement='start'
          />
        </FormControl>
      )}
    </>
  )
}

export default Discount
