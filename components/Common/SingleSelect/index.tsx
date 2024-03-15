import { IReportModule, ISelect } from '@/Interfaces'
import {
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

const SingleSelect = ({
  id,
  label,
  loading,
  data,
  value,
  isSignatories,
  signatoryType,
  width,
  height,
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
        value={value}
        onChange={handleChange}
        MenuProps={MenuProps}
        sx={{ width, height }}
      >
        {data?.map((row: any) => {
          if (isSignatories) {
            const isEnabled = row.report_module?.some(
              (report: IReportModule) =>
                report.is_enabled && report.report === signatoryType
            )

            if (isEnabled)
              return (
                <MenuItem key={row.id} value={row.id}>
                  <ListItemText primary={row.label} />
                </MenuItem>
              )
          } else {
            return (
              <MenuItem key={row.id} value={row.id}>
                <ListItemText primary={row.label} />
              </MenuItem>
            )
          }
        })}
      </Select>
    </FormControl>
  )
}

export default SingleSelect
