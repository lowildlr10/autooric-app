import React from 'react'
import { ICategories, IPaperSize, IReportCollectionProps, ISignatory } from '@/Interfaces'
import { Button, Checkbox, Divider, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack } from '@mui/material'
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

const ReportCollection = ({
  categories,
  signatories,
  paperSizes,
  inputData,
  handleInputChange,
  handlePrint
}: IReportCollectionProps) => {

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
          <InputLabel id="select_categories-label">Categories</InputLabel>
          <Select
            labelId='select_categories-label'
            id='select_categories'
            label='Categories'
            autoFocus
            size='small'
            multiple
            required
            renderValue={(selected) => {
              const selectedNames = selected?.map(sel => {
                const category = categories?.find(
                  (par: ICategories) => par.id === sel
                )

                if (category?.category_name) return category.category_name
              })
              return selectedNames.join(', ')
            }}
            value={inputData.category_ids}
            onChange={(e: SelectChangeEvent<typeof inputData.category_ids>) => {
              const {
                target: { value },
              } = e
              handleInputChange && handleInputChange(
                'category_ids', 
                typeof value === 'string' ? value.split(',') : value
              )
            }}
            MenuProps={MenuProps}
          >
            {categories?.map((category: ICategories) => (
              <MenuItem key={category.id} value={category.id}>
                <Checkbox 
                  size='small' 
                  checked={
                    inputData
                      .category_ids
                      .indexOf(category.id ?? '') > -1
                    } 
                  />
                <ListItemText primary={category.category_name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required focused>
          <InputLabel id="select_certified_corrected_by-label">Certified Corrected By</InputLabel>
          <Select
            labelId='select_certified_corrected_by-label'
            id='select_certified_corrected_by'
            label='Certified Corrected By'
            autoFocus
            size='small'
            required
            value={inputData.certified_correct_id}
            onChange={(e: SelectChangeEvent<typeof inputData.certified_correct_id>) => {
              handleInputChange && handleInputChange(
                'certified_correct_id', 
                e.target.value
              )
            }}
            MenuProps={MenuProps}
          >
            {signatories?.map((signatory: ISignatory) => {
              const isEnabled = signatory.report_module?.some(
                report => report.is_enabled && report.report === 'roc_certified_correct'
              )

              if (isEnabled) return (
                <MenuItem key={signatory.id} value={signatory.id}>
                  <ListItemText primary={signatory.signatory_name} />
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl required focused>
          <InputLabel id="select_noted_by-label">Noted By</InputLabel>
          <Select
            labelId='select_noted_by-label'
            id='select_noted_by'
            label='Noted By'
            autoFocus
            size='small'
            required
            value={inputData.noted_by_id}
            onChange={(e: SelectChangeEvent<typeof inputData.noted_by_id>) => {
              handleInputChange && handleInputChange(
                'noted_by_id', 
                e.target.value
              )
            }}
            MenuProps={MenuProps}
          >
            {signatories?.map((signatory: ISignatory) => {
              const isEnabled = signatory.report_module?.some(
                report => report.is_enabled && report.report === 'roc_noted_by'
              )

              if (isEnabled) return (
                <MenuItem key={signatory.id} value={signatory.id}>
                  <ListItemText primary={signatory.signatory_name} />
                </MenuItem>
              )
            })}
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

export default ReportCollection