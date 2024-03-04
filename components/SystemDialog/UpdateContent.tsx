import React from 'react'
import { IUpdateContentProps } from '@/Interfaces'
import Particulars from './SubContents/Particulars'
import Discount from './SubContents/Discount'
import User from './SubContents/User'
import Category from './SubContents/Category'
import PaperSize from './SubContents/PaperSize'

const UpdateContent = ({
  content,
  dialogType,
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

      {content === 'paper_sizes' && (
        <PaperSize
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  )
}

export default UpdateContent
