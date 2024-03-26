import React from 'react'
import { Stack } from '@mui/material'
import { ISummaryFeesProps } from '@/Interfaces'
import SectionLoader from '@/components/Loader/SectionLoader'

const SummaryFees = ({ printUrl }: ISummaryFeesProps) => {
  if (!printUrl) return <SectionLoader />

  return (
    <iframe
      src={printUrl}
      title='Embedded Content'
      height='100%'
      width='100%'
      style={{
        height: 'calc(-20.2em + 100vh)',
        width: 'calc(-21.22em + 100vw)',
      }}
    ></iframe>
  )
}

export default SummaryFees
