import React from 'react'
import { ICreateContentProps } from '@/Interfaces'
import Particulars from './SubContents/Particulars'
import Discount from './SubContents/Discount'
import User from './SubContents/User'
import Category from './SubContents/Category'
import PaperSize from './SubContents/PaperSize'
import Signatory from './SubContents/Signatory'

const CreateContent = ({
  content,
  dialogType,
  formData,
  handleInputChange,
}: ICreateContentProps) => {
  return (
    <>
      {content === 'users' && (
        <User formData={formData} handleInputChange={handleInputChange} />
      )}

      {content === 'cateogories' && (
        <Category
          dialogType={dialogType}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {content === 'particulars' && (
        <Particulars
          dialogType={dialogType}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {content === 'discounts' && (
        <Discount
          dialogType={dialogType}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {content === 'signatories' && (
        <Signatory
          dialogType={dialogType}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {content === 'paper_sizes' && (
        <PaperSize formData={formData} handleInputChange={handleInputChange} />
      )}
    </>
  )
}

export default CreateContent
