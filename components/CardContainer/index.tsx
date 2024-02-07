import React from 'react'
import { Card, CardContent, Stack, Typography } from '@mui/material'
import { ICardContainerProps } from '@/Interfaces'

const CardContainer = ({ title, children }: ICardContainerProps) => {
  return (
    <Card sx={{ p: 1.5 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title?.toUpperCase()}
        </Typography>
        <Stack mt={3}>{children}</Stack>
      </CardContent>
    </Card>
  )
}

export default CardContainer