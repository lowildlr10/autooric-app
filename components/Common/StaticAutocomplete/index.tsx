import React, { useMemo } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { IAutocomplete } from '@/Interfaces'

const StaticAutocomplete = ({
  id = '',
  name = '',
  label = '',
  handleFetchData,
  loading = false,
  data,
  value,
  required,
  handleChange,
  handleInputChange,
}: IAutocomplete) => {
  const autocompleteValue = useMemo(
    () => data.find((fData: any) => fData.id === value) ?? value,
    [data, value]
  )

  return (
    <Autocomplete
      onFocus={handleFetchData}
      options={data}
      value={autocompleteValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label={
            <>
              {label}{' '}
              {loading && <CircularProgress size={16} color='primary' />}
            </>
          }
          name={name}
          id={id}
          size='small'
          focused
          required={required}
          fullWidth
        />
      )}
      isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
      onInputChange={handleInputChange}
      onChange={handleChange}
      handleHomeEndKeys={false}
      freeSolo
      fullWidth
      clearOnBlur
      autoFocus
      autoHighlight
    />
  )
}

export default StaticAutocomplete
