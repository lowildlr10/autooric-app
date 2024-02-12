import React from 'react'
import { IDepositContentProps } from '@/Interfaces'
import Deposit from './SubContents/Deposit'

const DepositContent = ({
  formData,
  handleInputChange,
}: IDepositContentProps) => {
  return (
    <>
      <Deposit formData={formData} handleInputChange={handleInputChange} />
    </>
  )
}

export default DepositContent
