import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import { DateField, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ICreateOrActionButtonsProps, ICreateOrFieldsProps, ICreateOrProps } from '@/Interfaces'
import dayjs, { Dayjs } from 'dayjs'

const CreateOrFields = ({
  handleInputChange,
  payors,
  particulars,
  discounts,
  formData
}: ICreateOrFieldsProps) => {
  const [formattedPayors, setFormattedPayors] = useState<any>([])
  const [formattedParticulars, setFormattedParticulars] = useState<any>([])
  const [formattedDiscounts, setFormattedDiscounts] = useState<any>([])
  const [defaultDate, setDefaultDate] = useState<Dayjs | null>(dayjs())

  useEffect(() => {
    if (payors) {
      setFormattedPayors(payors.map(payor => ({
        id: payor.id,
        label: payor.payor_name
      })))
    }
  }, [payors])

  useEffect(() => {
    if (particulars) {
      setFormattedParticulars(particulars.map(particular => ({
        id: particular.id,
        label: particular.particular_name
      })))
    }
  }, [particulars])

  useEffect(() => {
    if (discounts) {
      setFormattedDiscounts(discounts.map(discount => ({
        id: discount.id,
        label: discount.discount_name
      })))
    }
  }, [discounts])

  return (
    <Stack 
      spacing={4}
      maxWidth={{ xs: '100%', lg: 600 }}
      border={1}
      borderColor='divider'
      borderRadius={3}
      p={4}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={4}>
        <Stack flex={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField 
              id='receipt_date'
              name='receipt_date'
              label="OR Date" 
              size='small'
              fullWidth
              required
              focused
              value={formData?.receipt_date ?? defaultDate}
              onChange={(newValue) => handleInputChange('receipt_date', newValue)}
              sx={{ m: 0 }}
            />
          </LocalizationProvider>
        </Stack>
        <Stack flex={1}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="or_no"
            label="OR Number"
            name="or_no"
            autoComplete=""
            size='small'
            focused
            autoFocus
            value={formData?.or_no}
            onChange={(e) => handleInputChange('or_no', e.target.value)}
            sx={{ m: 0 }}
          />
        </Stack>
      </Stack>
        
      <Stack direction='row'>
        <Autocomplete
          disablePortal
          disableClearable
          freeSolo
          id="sel-payor"
          options={formattedPayors}
          fullWidth
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Payor" 
              name='payor_id'
              id='payor_id'
              size='small'
              focused
              required
              fullWidth
            />
          )}
          value={formData?.payor_id}
          onChange={(e: any, newValue: string | null) => handleInputChange('payor_id', newValue)}
        />
      </Stack>

      <Stack>
        <Stack>
          <Autocomplete
            disablePortal
            id="sel-particulars"
            options={formattedParticulars}
            fullWidth
            renderInput={(params) => (
              <TextField 
                {...params} 
                name='nature_collection_id'
                id='nature_collection_id'
                label="Nature of Collection" 
                size='small'
                focused
                required
                fullWidth
              />
            )}
            value={formData?.nature_collection_id}
            onChange={(e: any, newValue: string | null) => handleInputChange('nature_collection_id', newValue)}
          />
        </Stack>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} gap={4}>
        <Stack flex={1}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            autoComplete=""
            size='small'
            focused
            sx={{ m: 0 }}
            value={formData?.amount}
            onChange={
              (e) => 
                handleInputChange(
                  'amount', isNaN(parseFloat(
                    !!e.target.value ? e.target.value : '0'
                  )) ? 0.00 : parseFloat(!!e.target.value ? e.target.value : '0').toFixed(2)
                )
            }
          />
        </Stack>

        <Stack flex={1}>
          <Autocomplete
            disablePortal
            id="sel-discounts"
            options={formattedDiscounts}
            fullWidth
            renderInput={(params) => (
              <TextField 
                {...params} 
                name='discount_id'
                id='discount_id'
                label="Discount" 
                size='small'
                focused
                fullWidth
              />
            )}
            value={formData?.discount_id}
            onChange={(e: any, newValue: string | null) => handleInputChange('discount_id', newValue)}
          />
        </Stack>
      </Stack>

      <Stack direction='row'>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="amount_words"
          label="Amount in Words"
          name="amount_words"
          autoComplete=""
          size='small'
          focused
          sx={{ m: 0 }}
          value={formData?.amount_words}
          onChange={(e) => handleInputChange('amount_words', e.target.value)}
        />
      </Stack>
      
      <Stack direction='row'>
        <FormControl>
          <FormLabel id="payment_mode">Mode of Payment*</FormLabel>
          <RadioGroup
            aria-labelledby="payment_mode"
            defaultValue="cash"
            name="paymemt_mode"
            id='payment_mode'
            value={formData?.payment_mode}
            onChange={(e) => handleInputChange('payment_mode', e.target.value)}
          >
            <FormControlLabel 
              value="cash" 
              control={<Radio size='small' />} 
              label="Cash" 
            />
            <FormControlLabel 
              value="check" 
              control={<Radio size='small' />} 
              label="Check" 
            />
            <FormControlLabel 
              value="money_order" 
              control={<Radio size='small' />} 
              label="Money Order" 
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </Stack>    
  )
}

const ActionButtons = ({
  formData,
  handleCreate,
  handlePrint,
  handleClear
}: ICreateOrActionButtonsProps) => {
  return (
    <Stack 
      spacing={2} 
      px={4}
      width={{ xs: '100%', lg: 350 }}
    >
      <Button
        onClick={() => handleCreate(formData, true)}
        variant='contained'
        color='primary'
        fullWidth
        sx={{  
          py: '0.8em',
        }}
      >Save & Print</Button>
      <Divider />
      <Button
        onClick={() => handleCreate(formData, false)}
        variant='contained'
        color='primary'
        fullWidth
        sx={{  
          py: '0.8em',
          bgcolor: 'secondary.main',
          '&:hover': {
            bgcolor: 'secondary.dark'
          }
        }}
      >Save Only</Button>
      <Button
        onClick={handleClear}
        variant='outlined'
        fullWidth
        sx={{ 
          py: '0.8em',
          color: 'common.black', 
          borderColor: 'common.black'
        }}
      >Clear</Button>
    </Stack>
  )
}

const CreateOr = ({
  payors,
  particulars,
  discounts,
  paperSizes,
  formData,
  handleCreate,
  handleInputChange,
  handlePrint,
  handleClear,
  handlePaperSizeChange
}: ICreateOrProps) => {
  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()}>
      <Stack 
        direction={{ xs: 'column', lg:'row'  }}
        width='100%'
      >
        <Stack 
          flex={1}
          alignItems={{ xs: 'center', lg: 'end' }}
        >
          <CreateOrFields 
            handleInputChange={(input_name, value) => handleInputChange(input_name, value)}
            payors={payors}
            particulars={particulars}
            discounts={discounts}
            formData={formData}
          />
        </Stack>
        <Stack 
          flex={1} 
          justifyContent='end'
          alignItems={{ xs: 'center', lg: 'start' }}
        >
          <ActionButtons 
            formData={formData}
            paperSizes={paperSizes}
            handleCreate={handleCreate}
            handlePrint={handlePrint}
            handleClear={handleClear}
            handlePaperSizeChange={handlePaperSizeChange}
          />
        </Stack>
      </Stack>
    </form>
  )
}

export default CreateOr