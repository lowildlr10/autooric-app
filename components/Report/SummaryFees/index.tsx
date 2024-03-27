import React from 'react'
import { ISummaryFeesProps } from '@/Interfaces'

const SummaryFees = ({
  printUrl
}: ISummaryFeesProps) => {
  return (
    <iframe
      src={printUrl}
      title="Embedded Content"
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
