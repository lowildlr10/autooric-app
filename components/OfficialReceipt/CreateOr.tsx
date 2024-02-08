import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography, createFilterOptions } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ICreateOrActionButtonsProps, ICreateOrFieldsProps, ICreateOrProps } from '@/Interfaces'
import dayjs from 'dayjs'

const filter = createFilterOptions<any>()

const CreateOrFields = ({
  handleInputChange,
  personelName,
  payors,
  particulars,
  discounts,
  formData,
  handleDialogOpen,
  fetchPayor,
  fetchParticular,
  fetchDiscount
}: ICreateOrFieldsProps) => {
  const [formattedPayors, setFormattedPayors] = useState<any>([])
  const [formattedParticulars, setFormattedParticulars] = useState<any>([])
  const [formattedDiscounts, setFormattedDiscounts] = useState<any>([])

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
            <DatePicker  
              name='receipt_date'
              label="OR Date *"
              value={dayjs(formData?.receipt_date) ?? dayjs()}
              autoFocus
              slotProps={{ 
                textField: {
                  size: 'small',
                  focused: true
                }
               }}
              onChange={
                (newValue) => 
                  handleInputChange('receipt_date', newValue ? newValue.format('YYYY-MM-DD') : '')}
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
            value={formData?.or_no ?? ''}
            onChange={e => handleInputChange(e.target.name, e.target.value)}
            sx={{ m: 0 }}
          />
        </Stack>
      </Stack>
        
      <Stack direction='row'>
        <Autocomplete
          onFocus={() => fetchPayor()}
          freeSolo
          id="sel-payor"
          options={formattedPayors}
          fullWidth
          clearOnBlur
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
          onKeyDown={(event) => {
            if (event.key === 'Enter') event.defaultMuiPrevented = true
          }}
          isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
          getOptionLabel={(option: any) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.label;
          }}
          renderOption={(props: any, option: any) => {
            delete props['key']
            return <li key={option.label} {...props}>{option.label}</li>
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.label);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                label: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          onChange={(e: any, newValue: any) => {
            handleInputChange('payor_id', newValue?.id ?? newValue?.inputValue ?? '')
          }}
        />
      </Stack>

      <Stack direction='row' gap={2}>
        <Stack flex={1}>
          <Autocomplete
            onFocus={() => fetchParticular()}
            clearOnBlur
            handleHomeEndKeys={false}
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
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.defaultMuiPrevented = true
            }}
            isOptionEqualToValue={(option: any, value: any) => option?.id === value?.id}
            onChange={(e: any, newValue: any) => {
              handleInputChange('nature_collection_id', newValue?.id ?? '')
            }}
          />
        </Stack>
        <Stack>
          <Button
            onClick={() => handleDialogOpen('create_particulars')}
            variant='contained'
            color='primary'
            size='small'
            sx={{ 
              py: '0.7em', 
              minWidth: 'auto',
              borderRadius: 5,
            }}
          ><LibraryAddIcon fontSize='small' /></Button>
        </Stack>
      </Stack>

      <Stack direction='row' gap={4}>
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
          value={formData?.amount ?? ''}
          inputProps={{ type: 'number'}}
          onChange={e => handleInputChange(e.target.name, e.target.value)}
        />
      </Stack>

      <Stack direction='row' gap={2}>
        <Stack flex={1}>
          <Autocomplete
            onFocus={() => fetchDiscount()}
            clearOnBlur
            handleHomeEndKeys={false}
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
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.defaultMuiPrevented = true
            }}
            isOptionEqualToValue={(option: any, value: any) => option?.id === value?.id}
            onChange={(e: any, newValue: any) => {
              handleInputChange('discount_id', newValue?.id ?? '')
            }}
          />
        </Stack>
        <Stack>
          <Button
            onClick={() => handleDialogOpen('create_discounts')}
            variant='contained'
            color='primary'
            size='small'
            sx={{ 
              py: '0.7em', 
              minWidth: 'auto',
              borderRadius: 5,
            }}
          ><LibraryAddIcon fontSize='small' /></Button>
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
          value={formData?.amount_words ?? ''}
          onChange={e => handleInputChange(e.target.name, e.target.value)}
        />
      </Stack>
      
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={3}>
        <Stack flex={1}>
          <FormControl>
            <FormLabel 
              id="payment_mode" 
              sx={{ fontSize: '0.9rem' }}
            >Mode of Payment*</FormLabel>
            <RadioGroup
              aria-labelledby="payment_mode"
              name="payment_mode"
              id='payment_mode'
              onChange={e => handleInputChange(e.target.name, e.target.value)}
              value={formData?.payment_mode ?? ''}
            >
              <FormControlLabel 
                value="cash" 
                control={<Radio size='small' onChange={e => handleInputChange(e.target.name, e.target.value)} />} 
                label="Cash" 
                sx={{  
                  '& .MuiFormControlLabel-label': { fontSize: '0.9rem' },
                  '& .MuiSvgIcon-root': { fontSize: '1rem' }
                }}
              />
              <FormControlLabel 
                value="check" 
                control={<Radio size='small' />} 
                label="Check" 
                sx={{  
                  '& .MuiFormControlLabel-label': { fontSize: '0.9rem' },
                  '& .MuiSvgIcon-root': { fontSize: '1rem' }
                }}
              />
              <FormControlLabel 
                value="money_order" 
                control={<Radio size='small' />} 
                label="Money Order"
                sx={{  
                  '& .MuiFormControlLabel-label': { fontSize: '0.9rem' },
                  '& .MuiSvgIcon-root': { fontSize: '1rem' }
                }} 
              />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack flex={1}>
          <Typography 
            color='text.secondary'
            variant='body1' 
            textAlign='left'
            sx={{  
              fontSize: '0.9rem'
            }}
          >
            Accountable Personel:
          </Typography>
          <Typography 
            color='text.primary'
            fontWeight={600}
            variant='body1' 
            textAlign='center' 
            sx={{ 
              textDecoration: 'underline', 
              fontSize: '0.9rem'
            }}
          >{personelName}</Typography>
          <Typography 
            color='text.secondary'
            variant='body1' 
            textAlign='center'
            sx={{  
              fontSize: '0.9rem'
            }}
          >Collecting Officer</Typography>
        </Stack>
      </Stack>
    </Stack>    
  )
}

const ActionButtons = ({
  formData,
  handleCreate,
  handlePrint,
  handleClear,
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
  personelName,
  payors,
  particulars,
  discounts,
  formData,
  handleCreate,
  handleInputChange,
  handlePrint,
  handleClear,
  fetchDiscount,
  fetchParticular,
  fetchPayor,
  handleDialogOpen
}: ICreateOrProps) => {

  useEffect(() => {
    handleClear()
  }, [])

  return (
    <form autoComplete="off" onSubmit={e => e.preventDefault()}>
      <Stack 
        direction={{ xs: 'column', lg:'row'  }}
        width='100%'
        gap={4}
        justifyContent='center'
      >
        <Stack 
          alignItems={{ xs: 'center', lg: 'end' }}
        >
          <CreateOrFields 
            handleInputChange={handleInputChange}
            personelName={personelName}
            payors={payors}
            particulars={particulars}
            discounts={discounts}
            formData={formData}
            handleDialogOpen={handleDialogOpen}
            fetchDiscount={fetchDiscount}
            fetchParticular={fetchParticular}
            fetchPayor={fetchPayor}
          />
        </Stack>
        <Stack 
          justifyContent='end'
          alignItems={{ xs: 'center', lg: 'start' }}
        >
          <ActionButtons 
            formData={formData}
            handleCreate={handleCreate}
            handlePrint={handlePrint}
            handleClear={handleClear}
          />
        </Stack>
      </Stack>
    </form>
  )
}

export default CreateOr