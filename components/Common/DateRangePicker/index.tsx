import React, { useEffect } from 'react'
import { IDateRangePicker } from '@/Interfaces'
import { Stack, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const DateRangePicker = ({
  from,
  to,
  handleChange
}: IDateRangePicker) => {
  
  useEffect(() => {
    if (from && to) {
      if (dayjs(from).isAfter(dayjs(to))) {
        handleChange && handleChange('to', from)
      }
    }
  }, [from, to])

  return (
    <Stack>
      <Typography variant='body2' fontWeight={500}>Select Date Range</Typography>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        gap={2}
        sx={{ marginTop: `1em !important` }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='From'
            slotProps={{
              textField: {
                size: 'small',
                focused: true,
              },
              field: {
                clearable: true,
              },
            }}
            value={from ? dayjs(from) : undefined}
            onChange={(newValue) =>
              handleChange && handleChange(
                'from',
                newValue ? newValue.format('YYYY-MM-DD') : undefined
              )
            }
            sx={{
              m: 0,
              flex: 1,
              width: '100%',
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='To'
            minDate={dayjs(from)}
            slotProps={{
              textField: {
                size: 'small',
                focused: true,
              },
              field: {
                clearable: true,
              },
            }}
            value={to ? dayjs(to) : undefined}
            onChange={(newValue) =>
              handleChange && handleChange(
                'to',
                newValue ? newValue.format('YYYY-MM-DD') : ''
              )
            }
            sx={{
              m: 0,
              flex: 1,
              width: '100%',
            }}
          />
        </LocalizationProvider>
      </Stack>
    </Stack>
  )
}

export default DateRangePicker