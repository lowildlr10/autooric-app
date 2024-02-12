import React from 'react'
import { IPrintContentProps } from '@/Interfaces'

const PrintContent = ({ printUrl }: IPrintContentProps) => {
  return (
    <iframe
      src={printUrl}
      height='100%'
      width='100%'
      style={{
        height: 'calc(100vh - 4.2em)',
        width: 'calc(100vw - 0.22em)',
        position: 'absolute',
        top: '0px',
        left: '0px',
      }}
    ></iframe>
  )
}

export default PrintContent
