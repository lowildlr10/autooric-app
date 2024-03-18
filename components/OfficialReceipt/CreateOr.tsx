import React, { useEffect, useState } from 'react'
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  ICreateOrActionButtonsProps,
  ICreateOrFieldsProps,
  ICreateOrProps,
} from '@/Interfaces'
import dayjs from 'dayjs'
import StaticAutocomplete from '../Common/StaticAutocomplete'
import DynamicAutocomplete from '../Common/DynamicAutocomplete'

const CreateOrFields = ({
  handleInputChange,
  personnelName,
  payors,
  particulars,
  discounts,
  computingDiscount,
  formData,
  readOnly,
  handleDialogOpen,
  fetchPayor,
  fetchParticular,
  fetchDiscount,
  payorLoading,
  particularLoading,
  discountLoading,
}: ICreateOrFieldsProps) => {
  const [formattedPayors, setFormattedPayors] = useState<any>([])
  const [formattedParticulars, setFormattedParticulars] = useState<any>([])
  const [formattedDiscounts, setFormattedDiscounts] = useState<any>([])
  const [defaultAmount, setDefaultAmount] = useState(0)
  const [cardNoRequired, setCardNoRequired] = useState(false)

  useEffect(() => {
    if (payors) {
      setFormattedPayors(
        payors.map((payor) => ({
          id: payor.id,
          label: payor.payor_name,
        }))
      )
    }
  }, [payors])

  useEffect(() => {
    if (particulars) {
      setFormattedParticulars(
        particulars.map((particular) => ({
          id: particular.id,
          label: particular.particular_name,
          default_amount: particular.default_amount ?? 0,
        }))
      )
    }
  }, [particulars])

  useEffect(() => {
    if (discounts) {
      setFormattedDiscounts(
        discounts.map((discount) => ({
          id: discount.id,
          label: discount.discount_name,
          requires_card_no: discount.requires_card_no,
        }))
      )
    }
  }, [discounts])

  useEffect(() => {
    handleInputChange && handleInputChange('amount', defaultAmount)
  }, [defaultAmount])

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
          {!readOnly ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name='receipt_date'
                label='OR Date *'
                value={dayjs(formData?.receipt_date) ?? dayjs()}
                autoFocus
                slotProps={{
                  textField: {
                    size: 'small',
                    focused: true,
                  },
                }}
                onChange={(newValue) =>
                  handleInputChange &&
                  handleInputChange(
                    'receipt_date',
                    newValue ? newValue.format('YYYY-MM-DD') : ''
                  )
                }
                sx={{ m: 0 }}
              />
            </LocalizationProvider>
          ) : (
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Receipt Date'
              size='small'
              focused
              value={formData?.receipt_date}
              disabled
              sx={{ m: 0 }}
            />
          )}
        </Stack>
        <Stack flex={1}>
          {!readOnly ? (
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='or_no'
              label='OR Number'
              name='or_no'
              autoComplete=''
              size='small'
              focused
              autoFocus
              value={formData?.or_no ?? ''}
              onChange={(e) =>
                handleInputChange &&
                handleInputChange(e.target.name, e.target.value)
              }
              inputProps={{
                maxLength: 10,
              }}
              sx={{ m: 0 }}
            />
          ) : (
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='OR Number'
              size='small'
              focused
              value={formData?.or_no}
              disabled
              sx={{ m: 0 }}
            />
          )}
        </Stack>
      </Stack>

      <Stack direction='row'>
        {!readOnly ? (
          <DynamicAutocomplete
            id='payor_id'
            name='payor_id'
            label='Payor'
            loading={payorLoading}
            data={formattedPayors}
            value={formData?.payor_id}
            handleFetchData={fetchPayor}
            handleChange={(e: any, newValue: any) => {
              handleInputChange &&
                handleInputChange(
                  'payor_id',
                  newValue?.id ?? newValue?.inputValue ?? ''
                )
            }}
            required
          />
        ) : (
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Payor'
            size='small'
            focused
            value={formData?.payor}
            disabled
            sx={{ m: 0 }}
          />
        )}
      </Stack>

      <Stack direction={!readOnly ? 'row' : 'column'} gap={2}>
        {!readOnly ? (
          <>
            <Stack flex={1}>
              <StaticAutocomplete
                id='nature_collection_id'
                name='nature_collection_id'
                label='Nature of Collection'
                loading={particularLoading ?? false}
                data={formattedParticulars}
                value={formData?.nature_collection_id}
                handleFetchData={fetchParticular}
                handleChange={(e: any, newValue: any) => {
                  handleInputChange &&
                    handleInputChange(
                      'nature_collection_id',
                      newValue?.id ?? newValue?.inputValue ?? ''
                    )
                }}
                handleInputChange={(e: any, newValue: any) => {
                  setDefaultAmount(
                    formattedParticulars.find(
                      (particular: any) => particular?.label === newValue
                    )?.default_amount ?? 0
                  )
                }}
                required
              />
            </Stack>
            <Stack>
              <Button
                onClick={() =>
                  handleDialogOpen && handleDialogOpen('create_particulars')
                }
                variant='contained'
                color='primary'
                size='small'
                sx={{
                  py: '0.7em',
                  minWidth: 'auto',
                  borderRadius: 5,
                }}
              >
                <LibraryAddIcon fontSize='small' />
              </Button>
            </Stack>
          </>
        ) : (
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Nature of Collection'
            size='small'
            focused
            value={formData?.nature_collection}
            disabled
            sx={{ m: 0 }}
          />
        )}
      </Stack>

      <Stack>
        {!readOnly ? (
          <>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='amount'
              label='Amount'
              name='amount'
              autoComplete=''
              size='small'
              focused
              sx={{ m: 0 }}
              value={formData?.amount ?? ''}
              InputProps={{
                type: 'number',
                startAdornment: (
                  <InputAdornment position='start'>₱</InputAdornment>
                ),
              }}
              onChange={(e) =>
                handleInputChange &&
                handleInputChange(e.target.name, e.target.value)
              }
            />
            {computingDiscount && (
              <FormHelperText
                sx={{
                  color: 'secondary.light',
                  '& svg': { color: 'secondary.light' },
                }}
              >
                <em>
                  <CircularProgress size='0.7rem' /> Computing discount...
                </em>
              </FormHelperText>
            )}
          </>
        ) : (
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Amount'
            size='small'
            focused
            value={formData?.amount}
            disabled
            InputProps={{
              type: 'number',
              startAdornment: (
                <InputAdornment position='start'>₱</InputAdornment>
              ),
            }}
            sx={{ m: 0 }}
          />
        )}
      </Stack>

      <Stack direction='row' gap={2}>
        {!readOnly ? (
          <>
            <Stack flex={1}>
              <StaticAutocomplete
                id='discount_id'
                name='discount_id'
                label='Discount'
                loading={discountLoading}
                data={formattedDiscounts}
                value={formData?.discount_id}
                handleFetchData={fetchDiscount}
                handleChange={(e: any, newValue: any) => {
                  handleInputChange &&
                    handleInputChange(
                      'discount_id',
                      newValue?.id ?? newValue?.inputValue ?? ''
                    )
                }}
                handleInputChange={(e: any, newValue: any) => {
                  setCardNoRequired(
                    formattedDiscounts.find(
                      (discount: any) => discount?.label === newValue
                    )?.requires_card_no ?? false
                  )
                }}
                required
              />
            </Stack>
            <Stack>
              <Button
                onClick={() =>
                  handleDialogOpen && handleDialogOpen('create_discounts')
                }
                variant='contained'
                color='primary'
                size='small'
                sx={{
                  py: '0.7em',
                  minWidth: 'auto',
                  borderRadius: 5,
                }}
              >
                <LibraryAddIcon fontSize='small' />
              </Button>
            </Stack>
          </>
        ) : (
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Discount'
            size='small'
            focused
            value={formData?.discount ?? 'N/a'}
            disabled
            sx={{ m: 0 }}
          />
        )}
      </Stack>

      {(formData?.discount_id || formData?.discount) && (
        <>
          {!readOnly ? (
            <>
              {!!cardNoRequired && (
                <Stack>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='card_no'
                    label='ID/Card Number'
                    name='card_no'
                    autoComplete=''
                    size='small'
                    focused
                    required
                    value={formData?.card_no ?? ''}
                    onChange={(e) =>
                      handleInputChange &&
                      handleInputChange(e.target.name, e.target.value)
                    }
                    sx={{ m: 0 }}
                  />
                </Stack>
              )}
            </>
          ) : (
            <>
              {formData?.card_no !== '' && (
                <Stack>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    label='ID/Card No'
                    size='small'
                    focused
                    value={formData?.card_no}
                    disabled
                    sx={{ m: 0 }}
                  />
                </Stack>
              )}
            </>
          )}
        </>
      )}

      <Stack direction='row'>
        {!readOnly ? (
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='amount_words'
            label='Amount in Words'
            name='amount_words'
            autoComplete=''
            size='small'
            focused
            sx={{ m: 0 }}
            value={formData?.amount_words ?? ''}
            onChange={(e) =>
              handleInputChange &&
              handleInputChange(e.target.name, e.target.value)
            }
          />
        ) : (
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Amount in Words'
            size='small'
            focused
            value={formData?.amount_words}
            disabled
            sx={{ m: 0 }}
          />
        )}
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} gap={3}>
        <Stack flex={1}>
          <FormControl>
            <FormLabel id='payment_mode' sx={{ fontSize: '0.9rem' }}>
              Mode of Payment*
            </FormLabel>
            <RadioGroup
              aria-labelledby='payment_mode'
              name='payment_mode'
              id='payment_mode'
              onChange={(e) =>
                handleInputChange &&
                handleInputChange(e.target.name, e.target.value)
              }
              value={formData?.payment_mode ?? ''}
            >
              <FormControlLabel
                value='cash'
                control={<Radio />}
                label='Cash'
                disabled={readOnly}
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.9rem' },
                  '& .MuiSvgIcon-root': { fontSize: '1rem' },
                }}
              />
              <FormControlLabel
                value='check'
                control={<Radio size='small' />}
                label='Check'
                disabled={readOnly}
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.9rem' },
                  '& .MuiSvgIcon-root': { fontSize: '1rem' },
                }}
              />
              {formData?.payment_mode === 'check' && (
                <Stack
                  gap={2}
                  p={2}
                  border={1}
                  mb={2}
                  borderColor='divider'
                  borderRadius={3}
                >
                  <>
                    {!readOnly ? (
                      <>
                        <TextField
                          variant='outlined'
                          margin='normal'
                          required
                          fullWidth
                          id='drawee_bank'
                          label='Drawee Bank'
                          name='drawee_bank'
                          autoComplete=''
                          size='small'
                          focused
                          sx={{ m: 0 }}
                          value={formData?.drawee_bank ?? ''}
                          onChange={(e) =>
                            handleInputChange &&
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                        <TextField
                          variant='outlined'
                          margin='normal'
                          required
                          fullWidth
                          id='check_no'
                          label='Number'
                          name='check_no'
                          autoComplete=''
                          size='small'
                          focused
                          sx={{ m: 0 }}
                          value={formData?.check_no ?? ''}
                          onChange={(e) =>
                            handleInputChange &&
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            name='check_date'
                            label='Check Date *'
                            value={
                              formData?.check_date
                                ? dayjs(formData?.check_date)
                                : undefined
                            }
                            slotProps={{
                              textField: {
                                size: 'small',
                                focused: true,
                              },
                            }}
                            onChange={(newValue) =>
                              handleInputChange &&
                              handleInputChange(
                                'check_date',
                                newValue ? newValue.format('YYYY-MM-DD') : ''
                              )
                            }
                            sx={{ m: 0 }}
                          />
                        </LocalizationProvider>
                      </>
                    ) : (
                      <>
                        <TextField
                          variant='outlined'
                          margin='normal'
                          fullWidth
                          label='Drawee Bank'
                          size='small'
                          focused
                          value={formData?.drawee_bank}
                          disabled
                          sx={{ m: 0 }}
                        />
                        <TextField
                          variant='outlined'
                          margin='normal'
                          fullWidth
                          label='Number'
                          size='small'
                          focused
                          value={formData?.check_no}
                          disabled
                          sx={{ m: 0 }}
                        />
                        <TextField
                          variant='outlined'
                          margin='normal'
                          fullWidth
                          label='Date'
                          size='small'
                          focused
                          value={formData?.check_date}
                          disabled
                          sx={{ m: 0 }}
                        />
                      </>
                    )}
                  </>
                </Stack>
              )}
              <FormControlLabel
                value='money_order'
                control={<Radio size='small' />}
                label='Money Order'
                disabled={readOnly}
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.9rem' },
                  '& .MuiSvgIcon-root': { fontSize: '1rem' },
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
              fontSize: '0.9rem',
            }}
          >
            Accountable Personnel:
          </Typography>
          <Typography
            color='text.primary'
            fontWeight={600}
            variant='body1'
            textAlign='center'
            sx={{
              textDecoration: 'underline',
              fontSize: '0.9rem',
            }}
          >
            {personnelName}
          </Typography>
          <Typography
            color='text.secondary'
            variant='body1'
            textAlign='center'
            sx={{
              fontSize: '0.9rem',
            }}
          >
            Collecting Officer
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

const ActionButtons = ({
  formData,
  readOnly,
  handleCreate,
  handlePrint,
  handleClear,
  handleDeposit,
  handleCancel,
  handleClose,
}: ICreateOrActionButtonsProps) => {
  const renderDynamicContents = (readOnly: boolean) => {
    if (readOnly)
      return (
        <>
          {formData?.deposited_date !== '' && (
            <>
              <Typography variant='body2' fontWeight={500} color='secondary'>
                Deposited on: {formData?.deposited_date}
              </Typography>
              <Typography variant='body2' fontWeight={500} color='secondary'>
                Deposited by: {formData?.deposited_by}
              </Typography>
            </>
          )}

          {formData?.cancelled_date !== '' && (
            <>
              <Typography variant='body2' fontWeight={500} color='error'>
                Cancelled on: {formData?.cancelled_date}
              </Typography>
              <Typography variant='body2' fontWeight={500} color='error'>
                Cancelled by: {formData?.cancelled_by}
              </Typography>
            </>
          )}

          {!formData?.deposit && !formData?.is_cancelled && (
            <>
              <Button
                onClick={() => handleDeposit && handleDeposit()}
                variant='contained'
                color='secondary'
                fullWidth
                sx={{
                  py: '0.8em',
                }}
              >
                Deposit
              </Button>
              <Divider />
            </>
          )}

          {!formData?.deposit && !formData?.is_cancelled && (
            <Button
              onClick={() => handleCancel && handleCancel()}
              variant='contained'
              color='primary'
              fullWidth
              sx={{
                py: '0.8em',
                bgcolor: 'warning.main',
                '&:hover': {
                  bgcolor: 'warning.darker',
                },
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleClose}
            variant='outlined'
            fullWidth
            sx={{
              py: '0.8em',
              color: 'common.black',
              borderColor: 'common.black',
            }}
          >
            Close
          </Button>
        </>
      )

    return (
      <>
        <Button
          onClick={() => handleCreate && handleCreate(formData, true)}
          variant='contained'
          color='primary'
          fullWidth
          sx={{
            py: '0.8em',
          }}
        >
          Save & Print
        </Button>
        <Divider />
        <Button
          onClick={() => handleCreate && handleCreate(formData, false)}
          variant='contained'
          color='primary'
          fullWidth
          sx={{
            py: '0.8em',
            bgcolor: 'secondary.main',
            '&:hover': {
              bgcolor: 'secondary.dark',
            },
          }}
        >
          Save Only
        </Button>
        <Button
          onClick={handleClear}
          variant='outlined'
          fullWidth
          sx={{
            py: '0.8em',
            color: 'common.black',
            borderColor: 'common.black',
          }}
        >
          Clear
        </Button>
      </>
    )
  }

  return (
    <Stack
      spacing={2}
      px={4}
      width={{ xs: '74%', lg: 'calc(25vw - 1em)', xl: 350 }}
      position={{ xs: 'relative', lg: 'absolute' }}
      bottom={{ xs: 'unset', lg: '86px' }}
    >
      {renderDynamicContents(readOnly ?? false)}
    </Stack>
  )
}

const CreateOr = ({
  personnelName,
  payors,
  particulars,
  discounts,
  computingDiscount,
  formData,
  readOnly,
  payorLoading,
  particularLoading,
  discountLoading,
  handleCreate,
  handleInputChange,
  handlePrint,
  handleClear,
  fetchDiscount,
  fetchParticular,
  fetchPayor,
  handleDialogOpen,
  handleDeposit,
  handleCancel,
  handleClose,
}: ICreateOrProps) => {
  useEffect(() => {
    if (handleClear) handleClear()
  }, [])

  return (
    <form autoComplete='off' onSubmit={(e) => e.preventDefault()}>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        width='100%'
        gap={4}
        justifyContent='center'
      >
        <Stack alignItems={{ xs: 'center', lg: 'end' }}>
          <CreateOrFields
            handleInputChange={handleInputChange}
            personnelName={personnelName}
            payors={payors}
            particulars={particulars}
            discounts={discounts}
            computingDiscount={computingDiscount}
            formData={formData}
            readOnly={readOnly}
            payorLoading={payorLoading}
            particularLoading={particularLoading}
            discountLoading={discountLoading}
            handleDialogOpen={handleDialogOpen}
            fetchDiscount={fetchDiscount}
            fetchParticular={fetchParticular}
            fetchPayor={fetchPayor}
          />
        </Stack>
        <Stack
          justifyContent='end'
          alignItems={{ xs: 'center', lg: 'start' }}
          width={{ xs: '100%', lg: 350 }}
        >
          <ActionButtons
            formData={formData}
            readOnly={readOnly}
            handleCreate={handleCreate}
            handlePrint={handlePrint}
            handleClear={handleClear}
            handleDeposit={handleDeposit}
            handleCancel={handleCancel}
            handleClose={handleClose}
          />
        </Stack>
      </Stack>
    </form>
  )
}

export default CreateOr
