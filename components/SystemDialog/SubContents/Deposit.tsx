import React from 'react'
import { IDepositSubContentProps } from '@/Interfaces'
import { InputAdornment, Stack, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const Deposit = ({ formData, handleInputChange }: IDepositSubContentProps) => {
  return (
    <>
      <Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name='deposited_date'
            label='Deposited Date *'
            value={dayjs(formData?.deposited_date) ?? dayjs()}
            autoFocus
            slotProps={{
              textField: {
                size: 'small',
                focused: true,
              },
            }}
            onChange={(newValue: any) =>
              handleInputChange &&
              handleInputChange(
                'deposited_date',
                newValue ? newValue.format('YYYY-MM-DD') : ''
              )
            }
            sx={{ m: 0 }}
          />
        </LocalizationProvider>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='deposit'
          label='Deposit Amount'
          name='deposit'
          autoComplete=''
          size='small'
          focused
          autoFocus
          value={formData?.deposit ?? 0}
          InputProps={{
            type: 'number',
            startAdornment: <InputAdornment position='start'>₱</InputAdornment>,
          }}
          disabled
        />
      </Stack>
    </>
  )
}

export default Deposit
