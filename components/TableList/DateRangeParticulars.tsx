import {
  IParticular,
  ISearchData,
  ITableListActionSectionDateRangeParticularsProps,
} from '@/Interfaces'
import { SelectChangeEvent, Stack } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useAccessToken from '@/hooks/useAccessToken'
import API from '@/utilities/API'
import SingleSelect from '../Common/SingleSelect'

const defaultSearchData: ISearchData = {
  from: undefined,
  to: undefined,
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
  const [formattedParticulars, setFormattedParticulars] = useState<any[]>([
    {
      id: '*',
      label: 'All',
    },
  ])
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
        from: searchData[0] === '*' ? undefined : searchData[0],
        to: searchData[1] === '*' ? undefined : searchData[1],
        particulars: searchData[2],
      })
      setInit(false)
    }
  }, [search, init])

  useEffect(() => {
    if (particulars) {
      particulars.unshift({
        id: '*',
        particular_name: 'All',
      })
      setFormattedParticulars(
        particulars.map((particular) => ({
          id: particular.id,
          label: particular.particular_name,
        }))
      )
    }
  }, [particulars])

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
          value={searchData.from ? dayjs(searchData.from) : undefined}
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
          value={searchData.to ? dayjs(searchData.to) : undefined}
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

      <SingleSelect
        id='particulars'
        label='Nature of Collection'
        data={formattedParticulars}
        value={searchData.particulars ?? '*'}
        loading={particularsLoading}
        handleChange={(e: SelectChangeEvent<typeof searchData.particulars>) => {
          handleInputChange && handleInputChange('particulars', e.target.value)
        }}
        width={{ xs: '100%', lg: 250 }}
        height='40.5px'
        required
      />
    </Stack>
  )
}

export default DateRangeParticulars
