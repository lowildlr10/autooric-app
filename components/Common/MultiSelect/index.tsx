import { ISelect } from '@/Interfaces'
import {
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material'
import React from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}

const MultiSelect = ({
  id,
  label,
  loading,
  data,
  value,
  required = false,
  handleChange,
}: ISelect) => {
  return (
    <FormControl required={required} focused>
      <InputLabel id={`select-${id}-label`}>
        {label} {loading && <CircularProgress size={16} color='primary' />}
      </InputLabel>
      <Select
        labelId={`select-${id}-label`}
        id={id}
        label={
          <>
            {label} {loading && <CircularProgress size={16} color='primary' />}
          </>
        }
        autoFocus
        size='small'
        multiple
        renderValue={(selected: string[]) => {
          const selectedNames = selected?.map((sel) => {
            const row = data?.find((row: any) => row.id === sel)

            if (row?.label) return row.label
          })
          return selectedNames.join(', ')
        }}
        value={value as string[]}
        onChange={handleChange}
        MenuProps={MenuProps}
      >
        {data?.map((row: any) => (
          <MenuItem key={row.id} value={row.id}>
            <Checkbox size='small' checked={value.indexOf(row.id ?? '') > -1} />
            <ListItemText primary={row.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultiSelect
