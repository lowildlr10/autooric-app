import React from 'react'
import { IUpdateContentProps } from '@/Interfaces'
import Particulars from './SubContents/Particulars'
import Discount from './SubContents/Discount'
import User from './SubContents/User'

const UpdateContent = ({
  content,
  formData,
  handleInputChange,
}: IUpdateContentProps) => {
  return (
    <>
      {content === 'users' && (
        <User 
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {content === 'particulars' && (
        <Particulars
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {content === 'discounts' && (
        <Discount formData={formData} handleInputChange={handleInputChange} />
      )}
    </>
  )
}

export default UpdateContent
