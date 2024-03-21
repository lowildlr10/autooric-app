import React from 'react'
import { IPrintPreviewContentProps } from '@/Interfaces'
import PreviewReportCollection from './SubContents/PreviewReportCollection'

const PrintPreviewContent = ({ 
  content,
  printPreviewData,
  handleInputChange
}: IPrintPreviewContentProps) => {
  return (
    <>
      {content === 'print_report_collection' && (
        <PreviewReportCollection
          printPreviewData={printPreviewData}
          handleInputChange={handleInputChange ?? undefined}
        />
      )}
    </>
  )
}

export default PrintPreviewContent
