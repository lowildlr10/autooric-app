import React, { useEffect, useMemo, useState } from 'react'
import { ICategories, IParticularsSubContentProps } from '@/Interfaces'
import {
  Autocomplete,
  InputAdornment,
  TextField,
  createFilterOptions,
} from '@mui/material'
import useAccessToken from '@/hooks/useAccessToken'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import SectionLoader from '@/components/Loader/SectionLoader'
import DynamicAutocomplete from '@/components/Common/DynamicAutocomplete'

const filter = createFilterOptions<any>()

const Particulars = ({
  dialogType,
  formData,
  handleInputChange,
}: IParticularsSubContentProps) => {
  const { accessToken } = useAccessToken()
  const [categories, setCategories] = useState<ICategories[]>()
  const [formattedCategories, setFormattedCategories] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchCategories()
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

  if (loading) return <SectionLoader />

  return (
    <>
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
    </>
  )
}

export default Particulars
