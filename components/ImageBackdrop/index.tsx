import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const ImageBackdrop = () => {
  return (
    <Box sx={{ 
      position: 'absolute', 
      height: '100vh',
      width: '100%',
      top: 0,
      left: 0,
      zIndex: -100,
    }}>
      <Image
        src="/images/temp-bg.png"
        alt="Temp Background Image"
        fill
        style={{objectFit:"cover"}}
      />
    </Box>
  )
}

export default ImageBackdrop