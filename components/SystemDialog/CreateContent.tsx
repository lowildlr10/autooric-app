import React from 'react'
import { ICreateContentProps } from '@/Interfaces'
import Particulars from './SubContents/Particulars'
import Discount from './SubContents/Discount'
import User from './SubContents/User'

const CreateContent = ({
  content,
  formData,
  handleInputChange,
}: ICreateContentProps) => {
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

export default CreateContent
