import React, { useEffect, useState } from 'react'
import { ICategories, IParticularsSubContentProps } from '@/Interfaces'
import { Autocomplete, TextField, createFilterOptions } from '@mui/material'
import useAccessToken from '@/hooks/useAccessToken'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import SectionLoader from '@/components/Loader/SectionLoader'

const filter = createFilterOptions<any>()

const Particulars = ({
  formData,
  handleInputChange
}: IParticularsSubContentProps) => {
  const { accessToken } = useAccessToken()
  const [categories, setCategories] = useState<ICategories[]>()
  const [formattedCategories, setFormattedCategories] = useState<any>([{
    id: '1',
    label: 'loading...'
  }])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchCategories()
  }, [accessToken])

  useEffect(() => {
    setLoading(true)
    if (categories) {
      setFormattedCategories(categories.map(category => ({
        id: category.id,
        label: category.category_name
      })))
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
          toast.error(error?.response?.data?.message ?? 'An error occured while fetching categories')
          setLoading(false)
        })
    }
  }

  if (loading) return <SectionLoader />

  return (
    <>
      <Autocomplete
        freeSolo
        id="sel-category"
        options={formattedCategories}
        fullWidth
        clearOnBlur
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Category" 
            name='category_id'
            id='category_id'
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
          handleInputChange('category_id', newValue?.id ?? newValue?.inputValue ?? '')
        }}
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="particular_name"
        label="Particular Name"
        name="particular_name"
        autoComplete=""
        size='small'
        focused
        autoFocus
        value={formData?.particular_name ?? ''}
        onChange={e => handleInputChange('particular_name', e.target.value)}
        sx={{ m: 0 }}
      />
    </>
  )
}

export default Particulars