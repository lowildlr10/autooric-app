import React, { useEffect, useState } from 'react'
import { ICategories, IPaperSize, ISummaryFeesProps } from '@/Interfaces'
import { Button, Divider, SelectChangeEvent, Stack } from '@mui/material'
import DateRangePicker from '@/components/Common/DateRangePicker'
import MultiSelect from '@/components/Common/MultiSelect'
import SingleSelect from '@/components/Common/SingleSelect'

const SummaryFees = ({
  categories,
  paperSizes,
  inputData,
  handleInputChange,
  handlePrint,
}: ISummaryFeesProps) => {
  const [formattedCategories, setFormattedCategories] = useState<ICategories[]>(
    []
  )
  const [formattedPaperSizes, setFormattedPaperSizes] = useState<IPaperSize[]>(
    []
  )

  useEffect(() => {
    if (categories) {
      setFormattedCategories(
        categories.map((category) => ({
          id: category.id,
          label: category.category_name,
        }))
      )
    }
  }, [categories])

  useEffect(() => {
    if (paperSizes) {
      setFormattedPaperSizes(
        paperSizes.map((paper) => ({
          id: paper.id,
          label: paper.paper_name,
        }))
      )
    }
  }, [paperSizes])

  return (
    <Stack justifyItems='center' alignItems='center'>
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
          required
        />

        <Divider />

        <MultiSelect
          id='categories'
          label='Categories'
          data={formattedCategories}
          value={inputData.category_ids}
          handleChange={(
            e: SelectChangeEvent<typeof inputData.category_ids>
          ) => {
            const {
              target: { value },
            } = e
            handleInputChange &&
              handleInputChange(
                'category_ids',
                typeof value === 'string' ? value.split(',') : value
              )
          }}
          required
        />

        <SingleSelect
          id='paper_size'
          label='Paper Size'
          data={formattedPaperSizes}
          value={inputData.paper_size_id}
          handleChange={(
            e: SelectChangeEvent<typeof inputData.paper_size_id>
          ) => {
            handleInputChange &&
              handleInputChange('paper_size_id', e.target.value)
          }}
          required
        />

        <Button variant='contained' size='large' onClick={handlePrint}>
          Print
        </Button>
      </Stack>
    </Stack>
  )
}

export default SummaryFees
