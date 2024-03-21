import React from 'react'
import { IPreviewReportCollectionSubContentProps } from '@/Interfaces'
import {
  Stack,
  Table,
  TableContainer,
  Typography,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TextField,
} from '@mui/material'

const PreviewReportCollection = ({
  printPreviewData,
  handleInputChange,
}: IPreviewReportCollectionSubContentProps) => {
  return (
    <>
      {printPreviewData?.categories?.map((category: any, catIndex: number) => (
        <Stack key={category.category_name}>
          <Typography variant='h6'>{category.category_name}</Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, width: '100%' }} size='medium'>
              <TableHead>
                <TableRow>
                  <TableCell width={300} align='center'>
                    PARTICULARS
                  </TableCell>
                  <TableCell width={150} align='center'>
                    NR OF OR USED
                  </TableCell>
                  <TableCell width={150} align='center'>
                    AMOUNT
                  </TableCell>
                  <TableCell width={200} align='center'>
                    REMARKS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {category?.particulars?.map(
                  (particular: any, parIndex: number) => (
                    <TableRow
                      key={particular.particular_name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {particular.particular_name}
                      </TableCell>
                      <TableCell align='center'>
                        {particular.or_count}
                      </TableCell>
                      <TableCell align='center'>
                        {particular.amount_sum}
                      </TableCell>
                      <TableCell align='center'>
                        <TextField
                          variant='outlined'
                          margin='normal'
                          required
                          name={`remarks_${catIndex}_${parIndex}`}
                          autoComplete=''
                          size='small'
                          focused
                          autoFocus
                          value={particular?.remarks ?? ''}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      ))}
    </>
  )
}

export default PreviewReportCollection
