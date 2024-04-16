import React, { useEffect, useState } from 'react'
import {
  ICashReceiptsRecordProps,
  IPaperSize,
  IParticular,
  ISignatory,
} from '@/Interfaces'
import { Button, Divider, SelectChangeEvent, Stack } from '@mui/material'
import DateRangePicker from '@/components/Common/DateRangePicker'
import SingleSelect from '@/components/Common/SingleSelect'
import MultiSelect from '@/components/Common/MultiSelect'

const CashReceiptsRecord = ({
  particulars,
  signatories,
  paperSizes,
  inputData,
  handleInputChange,
  handlePrint,
}: ICashReceiptsRecordProps) => {
  const [formattedParticulars, setFormattedParticulars] = useState<
    IParticular[]
  >([])
  const [formattedSignatories, setFormattedSignatories] = useState<
    ISignatory[]
  >([])
  const [formattedPaperSizes, setFormattedPaperSizes] = useState<IPaperSize[]>(
    []
  )

  useEffect(() => {
    if (particulars) {
      setFormattedParticulars(() => {
        const deselectAllParticular = { id: 'clear', label: 'Deselect All' }
        const selectAllParticular = { id: 'all', label: 'Select All' }

        return [
          deselectAllParticular,
          selectAllParticular,
          ...particulars.map(({ id, particular_name }) => ({
            id,
            label: particular_name,
          })),
        ]
      })
    }
  }, [particulars])

  useEffect(() => {
    if (signatories) {
      setFormattedSignatories(
        signatories.map((signatory) => ({
          id: signatory.id,
          label: signatory.signatory_name,
          report_module: signatory.report_module ?? [],
        }))
      )
    }
  }, [signatories])

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
          id='particular'
          label='Nature of Collection'
          data={formattedParticulars}
          value={inputData.particulars_ids}
          handleChange={(
            e: SelectChangeEvent<typeof inputData.particulars_ids>
          ) => {
            const {
              target: { value },
            } = e
            handleInputChange &&
              handleInputChange(
                'particulars_ids',
                typeof value === 'string' ? value.split(',') : value
              )
          }}
          required
        />

        <SingleSelect
          id='certified_corrected_by'
          label='Certified Corrected By'
          data={formattedSignatories}
          value={inputData.certified_correct_id}
          handleChange={(
            e: SelectChangeEvent<typeof inputData.certified_correct_id>
          ) => {
            handleInputChange &&
              handleInputChange('certified_correct_id', e.target.value)
          }}
          signatoryType='crr_certified_correct'
          isSignatories
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

export default CashReceiptsRecord
