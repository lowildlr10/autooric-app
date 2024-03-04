import {
  IParticular,
  ISearchData,
  ITableListActionSectionDateRangeParticularsProps,
} from '@/Interfaces'
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useAccessToken from '@/hooks/useAccessToken'
import API from '@/utilities/API'

const defaultSearchData: ISearchData = {
  from: '',
  to: '',
  particulars: '*',
}

const DateRangeParticulars = ({
  search,
  handleChange,
  loading,
}: ITableListActionSectionDateRangeParticularsProps) => {
  const { accessToken } = useAccessToken()
  const [searchData, setSearchData] = useState<ISearchData>(defaultSearchData)
  const [particulars, setParticulars] = useState<IParticular[]>([])
  const [particularsLoading, setParticularsLoading] = useState(true)
  const [init, setInit] = useState(true)

  useEffect(() => {
    if (!loading) return
    fetchParticulars()
  }, [loading])

  useEffect(() => {
    if (search && init) return

    let from = '*'
    let to = '*'
    if (searchData.from && searchData.to) {
      if (dayjs(searchData.from).isAfter(dayjs(searchData.to))) {
        handleInputChange('to', searchData.from)
      }

      from = searchData.from
      to = searchData.to
    }

    handleChange(`${from}|${to}|${searchData.particulars}`)

    setInit(false)
  }, [searchData, init, search])

  useEffect(() => {
    if (search && init) {
      const searchData = search.split('|')
      setSearchData({
        from: searchData[0],
        to: searchData[1],
        particulars: searchData[2],
      })
      setInit(false)
    }
  }, [search, init])

  // Fetch particulars
  const fetchParticulars = () => {
    if (accessToken) {
      API.getParticulars(accessToken)
        .then((response) => {
          const res = response?.data.data
          setParticulars(res)
          setParticularsLoading(false)
        })
        .catch((error) => {
          toast.error(
            'An error occurred while fetching particulars. Please try again.'
          )
          setParticularsLoading(false)
        })
    }
  }

  const handleInputChange = (
    input_name: string,
    value: string | number | null
  ) => {
    setSearchData({ ...searchData, [input_name]: value })
  }

  return (
    <Stack direction='row' gap={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='From'
          slotProps={{
            textField: {
              size: 'small',
              focused: true,
            },
            field: {
              clearable: true,
            },
          }}
          value={dayjs(searchData.from) ?? dayjs()}
          onChange={(newValue) =>
            handleInputChange(
              'from',
              newValue ? newValue.format('YYYY-MM-DD') : ''
            )
          }
          sx={{
            m: 0,
            flex: 1,
            width: { xs: '100%', lg: 250 },
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='To'
          minDate={dayjs(searchData.from)}
          slotProps={{
            textField: {
              size: 'small',
              focused: true,
            },
            field: {
              clearable: true,
            },
          }}
          value={dayjs(searchData.to) ?? dayjs()}
          onChange={(newValue) =>
            handleInputChange(
              'to',
              newValue ? newValue.format('YYYY-MM-DD') : ''
            )
          }
          sx={{
            m: 0,
            flex: 1,
            width: { xs: '100%', lg: 250 },
          }}
        />
      </LocalizationProvider>
      <FormControl sx={{ flex: 1 }} focused>
        <InputLabel id='select_particulars-label'>Particulars</InputLabel>
        <Select
          labelId='select_particulars-label'
          id='select_particulars'
          label='Particulars'
          autoFocus
          size='small'
          value={searchData.particulars}
          onChange={(e: any) =>
            handleInputChange('particulars', e.target.value)
          }
          onOpen={fetchParticulars}
          sx={{
            width: { xs: '100%', lg: 250 },
          }}
        >
          <MenuItem value={'*'} defaultChecked>
            All
          </MenuItem>
          {!particularsLoading ? (
            particulars?.map((particular: IParticular) => (
              <MenuItem key={particular.id} value={particular.id}>
                {particular.particular_name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={searchData.particulars}>Loading...</MenuItem>
          )}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default DateRangeParticulars
