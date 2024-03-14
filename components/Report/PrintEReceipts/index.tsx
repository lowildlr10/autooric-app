import React from 'react'
import { IPaperSize, IParticular, IPrintEReceiptsProps } from '@/Interfaces'
import { Button, Checkbox, Divider, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material'
import DateRangePicker from '@/components/Common/DateRangePicker'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    },
  },
}

const PrintEReceipts = ({
  particulars,
  paperSizes,
  inputData,
  handleInputChange,
  handlePrint
}: IPrintEReceiptsProps) => {
  
  return (
    <Stack 
      justifyItems='center' 
      alignItems='center'
    >
      <Stack
        spacing={4}
        maxWidth={{ xs: '50vw', lg: 400 }}
        width={{ xs: '50vw', lg: 400 }}
        p={4}
      >
        <DateRangePicker 
          from={inputData.from}
          to={inputData.to}
          handleChange={handleInputChange}
        />
        <Divider />
        <FormControl required focused>
          <InputLabel id="select_particulars-label">Nature of Collection</InputLabel>
          <Select
            labelId='select_particulars-label'
            id='select_particulars'
            label='Nature of Collection'
            autoFocus
            size='small'
            multiple
            required
            renderValue={(selected) => {
              const selectedNames = selected?.map(sel => {
                const particular = particulars?.find(
                  (par: IParticular) => par.id === sel
                )

                if (particular?.particular_name) return particular.particular_name
              })
              return selectedNames.join(', ')
            }}
            value={inputData.particulars_ids}
            onChange={(e: SelectChangeEvent<typeof inputData.particulars_ids>) => {
              const {
                target: { value },
              } = e
              handleInputChange && handleInputChange(
                'particulars_ids', 
                typeof value === 'string' ? value.split(',') : value
              )
            }}
            MenuProps={MenuProps}
          >
            {particulars?.map((particular: IParticular) => (
              <MenuItem key={particular.id} value={particular.id}>
                <Checkbox 
                  size='small' 
                  checked={
                    inputData
                      .particulars_ids
                      .indexOf(particular.id ?? '') > -1
                    } 
                  />
                <ListItemText primary={particular.particular_name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required focused>
          <InputLabel id="select_paper_size-label">Paper Size</InputLabel>
          <Select
            labelId='select_paper_size-label'
            id='select_paper_size'
            label='Paper Size'
            autoFocus
            size='small'
            required
            value={inputData.paper_size_id}
            onChange={(e: SelectChangeEvent<typeof inputData.paper_size_id>) => {
              handleInputChange && handleInputChange(
                'paper_size_id', 
                e.target.value
              )
            }}
            MenuProps={MenuProps}
          >
            {paperSizes?.map((paperSize: IPaperSize) => (
              <MenuItem key={paperSize.id} value={paperSize.id}>
                <ListItemText primary={paperSize.paper_name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button 
          variant='contained' 
          size='large'
          onClick={handlePrint}
        >Print</Button>
      </Stack>
    </Stack>
  )
}

export default PrintEReceipts