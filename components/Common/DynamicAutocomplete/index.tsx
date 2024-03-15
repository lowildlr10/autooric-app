import React, { useMemo } from 'react'
import {
  Autocomplete,
  CircularProgress,
  TextField,
  createFilterOptions,
} from '@mui/material'
import { IAutocomplete } from '@/Interfaces'

const filter = createFilterOptions<any>()

const DynamicAutocomplete = ({
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
      getOptionLabel={(option: any) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue
        }
        // Regular option
        return option.label
      }}
      renderOption={(props: any, option: any) => {
        delete props['key']
        return (
          <li key={option.label} {...props}>
            {option.label}
          </li>
        )
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)

        const { inputValue } = params
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.label)
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            label: `Add "${inputValue}"`,
          })
        }

        return filtered
      }}
      onInputChange={handleInputChange}
      onChange={handleChange}
      freeSolo
      fullWidth
      clearOnBlur
      autoFocus
      autoHighlight
    />
  )
}

export default DynamicAutocomplete
