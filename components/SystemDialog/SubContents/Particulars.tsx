import React, { useEffect, useState } from 'react'
import { ICategories, IAccount, IParticularsSubContentProps } from '@/Interfaces'
import {
  Divider,
  FormControlLabel,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import useAccessToken from '@/hooks/useAccessToken'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import SectionLoader from '@/components/Loader/SectionLoader'
import DynamicAutocomplete from '@/components/Common/DynamicAutocomplete'

const Particulars = ({
  dialogType,
  formData,
  handleInputChange,
}: IParticularsSubContentProps) => {
  const { accessToken } = useAccessToken()
  const [categories, setCategories] = useState<ICategories[]>()
  const [accounts, setAccounts] = useState<IAccount[]>()
  const [formattedCategories, setFormattedCategories] = useState<any>([])
  const [formattedAccounts, setFormattedAccounts] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchCategories()
  }, [accessToken])

  useEffect(() => {
    fetchAccounts()
  }, [accessToken])

  useEffect(() => {
    setLoading(true)
    if (categories) {
      setFormattedCategories(
        categories.map((category) => ({
          id: category.id,
          label: category.category_name,
        }))
      )
    }
    setLoading(false)
  }, [categories])

  useEffect(() => {
    setLoading(true)
    if (accounts) {
      setFormattedAccounts(
        accounts.map((account) => ({
          id: account.id,
          label: 
            `${account.account_name} ${account.account_number ? `(${account.account_number})` : ''}`,
        }))
      )
    }
    setLoading(false)
  }, [accounts])

  const fetchCategories = () => {
    setLoading(true)
    if (accessToken) {
      API.getCategories(accessToken)
        .then((response) => {
          const res = response?.data.data
          setCategories(res)
          setLoading(false)
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ??
              'An error occured while fetching categories'
          )
          setLoading(false)
        })
    }
  }

  const fetchAccounts = () => {
    setLoading(true)
    if (accessToken) {
      API.getAccounts(accessToken)
        .then((response) => {
          const res = response?.data.data
          setAccounts(res)
          setLoading(false)
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ??
              'An error occured while fetching accounts'
          )
          setLoading(false)
        })
    }
  }

  if (loading) return <SectionLoader />

  return (
    <>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='particular_name'
        label='Particular Name'
        name='particular_name'
        autoComplete=''
        size='small'
        focused
        autoFocus
        value={formData?.particular_name ?? ''}
        onChange={(e) => handleInputChange('particular_name', e.target.value)}
        sx={{ m: 0 }}
      />

      <DynamicAutocomplete
        id='category_id'
        name='category_id'
        label='Category'
        data={formattedCategories}
        value={formData?.category_id}
        handleChange={(e: any, newValue: any) => {
          handleInputChange &&
            handleInputChange(
              'category_id',
              newValue?.id ?? newValue?.inputValue ?? ''
            )
        }}
        required
      />

      <DynamicAutocomplete
        id='account_id'
        name='account_id'
        label='Account'
        data={formattedAccounts}
        value={formData?.account_id}
        handleChange={(e: any, newValue: any) => {
          handleInputChange &&
            handleInputChange(
              'account_id',
              newValue?.id ?? newValue?.inputValue ?? ''
            )
        }}
        required
      />

      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='default_amount'
        label='Default Amount'
        name='default_amount'
        autoComplete=''
        size='small'
        focused
        sx={{ m: 0 }}
        value={formData?.default_amount ?? ''}
        InputProps={{
          type: 'number',
          startAdornment: <InputAdornment position='start'>₱</InputAdornment>,
        }}
        onChange={(e) => handleInputChange('default_amount', e.target.value)}
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
          onChange={(e) => handleInputChange('order_no', e.target.value)}
        />
      )}

      <Stack
        border={1}
        borderRadius={3}
        p={2}
        borderColor='divider'
      >
        <Typography variant='h6' fontWeight={500}>
          Report of Collection
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack>
          <Typography variant='body2' fontWeight={500} mb={1}>
            Displayed in:
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={formData?.coa_accounting ?? false}
                color='primary'
                name='coa_accounting'
                size='small'
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={(e) =>
                  handleInputChange(
                    'coa_accounting',
                    e.target.checked
                  )
                }
              />
            }
            label='COA/Accounting Template'
            labelPlacement='end'
            sx={{
              mb: 1,
              '&>span': {
                fontSize: '0.9rem',
                fontWeight: 500,
              },
            }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData?.pnp_crame ?? false}
                color='primary'
                name='pnp_crame'
                size='small'
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={(e) =>
                  handleInputChange(
                    'pnp_crame',
                    e.target.checked
                  )
                }
              />
            }
            label='CRAME Template'
            labelPlacement='end'
            sx={{
              mb: 1,
              '&>span': {
                fontSize: '0.9rem',
                fontWeight: 500,
              },
            }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData?.firearms_registration ?? false}
                color='primary'
                name='firearms_registration'
                size='small'
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={(e) =>
                  handleInputChange(
                    'firearms_registration',
                    e.target.checked
                  )
                }
              />
            }
            label='CSG Caravan on Firearms Registration Template'
            labelPlacement='end'
            sx={{
              mb: 1,
              '&>span': {
                fontSize: '0.9rem',
                fontWeight: 500,
              },
            }}
          />
        </Stack>
      </Stack>
        
    </>
  )
}

export default Particulars
