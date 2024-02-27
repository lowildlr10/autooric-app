import React from 'react'
import { IDepositSubContentProps } from '@/Interfaces'
import { Button, InputAdornment, Stack, TextField } from '@mui/material'

const Deposit = ({ formData, handleInputChange }: IDepositSubContentProps) => {
  return (
    <>
      <Stack>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='deposit'
          label='Deposit Amount'
          name='deposit'
          autoComplete=''
          size='small'
          focused
          autoFocus
          value={formData?.deposit ?? 0}
          InputProps={{
            type: 'number',
            startAdornment: <InputAdornment position='start'>₱</InputAdornment>,
          }}
          disabled
        />
        {/* <Stack direction='row' gap={2}>
          <Button
            variant='outlined'
            color='primary'
            size='small'
            onClick={() => handleInputChange('deposit', formData?.regular ?? 0)}
          >
            Regular
          </Button>
          {formData?.has_discount && (
            <Button
              variant='outlined'
              size='small'
              onClick={() =>
                handleInputChange('deposit', formData?.discounted ?? 0)
              }
              sx={{
                color: 'common.black',
                borderColor: 'common.black',
              }}
            >
              Discounted
            </Button>
          )}
        </Stack> */}
      </Stack>
    </>
  )
}

export default Deposit
