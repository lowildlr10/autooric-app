import React, { useEffect, useMemo, useState } from 'react'
import { IDesignations, IPositions, IReportModule, ISignatoriesSubContentProps, IStations, ReportTypes } from '@/Interfaces'
import useAccessToken from '@/hooks/useAccessToken'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import SectionLoader from '@/components/Loader/SectionLoader'
import {
  Autocomplete,
  Divider,
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
  createFilterOptions
} from '@mui/material'
import AssessmentIcon from '@mui/icons-material/Assessment'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'

interface ReportInputs {
  id: ReportTypes,
  label: string
}

const filter = createFilterOptions<any>()

const Signatory = ({
  formData,
  dialogType,
  handleInputChange,
}: ISignatoriesSubContentProps) => {
  const { accessToken } = useAccessToken()
  const [positions, setPositions] = useState<IPositions[]>()
  const [designations, setDesignations] = useState<IDesignations[]>()
  const [stations, setStations] = useState<IStations[]>()
  const [crrReportData, setCrrReportData] = useState<IReportModule>({
    report: 'cash_receipts_record',
    position_id: '',
    designation_id: '',
    station_id: ''
  })
  const [rocReportData, setRocReportData] = useState<IReportModule>({
    report: 'report_collection',
    position_id: '',
    designation_id: '',
    station_id: ''
  })
  const [formattedPositions, setFormattedPositions] = useState<any>([])
  const [formattedDesignations, setFormattedDesignations] = useState<any>([])
  const [formattedStations, setFormattedStations] = useState<any>([])
  const [loadingPositions, setLoadingPositions] = useState<boolean>(true)
  const [loadingDesignations, setLoadingDesignations] = useState<boolean>(true)
  const [loadingStations, setLoadingStations] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [reportInputs, setReportInputs] = useState<ReportInputs[]>([
    {
      id: 'cash_receipts_record',
      label: 'Cash Receipts Record'
    },
    {
      id: 'report_collection',
      label: 'Report of Collection'
    }
  ])
  const positionCrrValue = useMemo(
    () =>
      formattedPositions.find(
        (position: IPositions) => position.id === crrReportData?.position_id
      ) ?? crrReportData?.position_id,
    [formattedPositions, crrReportData]
  )
  const positionRocValue = useMemo(
    () =>
      formattedPositions.find(
        (position: IPositions) => position.id === rocReportData?.position_id
      ) ?? rocReportData?.position_id,
    [formattedPositions, rocReportData]
  )
  const designationCrrValue = useMemo(
    () =>
      formattedDesignations.find(
        (designation: IDesignations) => designation.id === crrReportData?.designation_id
      ) ?? crrReportData?.designation_id,
    [formattedDesignations, crrReportData]
  )
  const designationRocValue = useMemo(
    () =>
      formattedDesignations.find(
        (designation: IDesignations) => designation.id === rocReportData?.designation_id
      ) ?? rocReportData?.designation_id,
    [formattedDesignations, rocReportData]
  )
  const stationCrrValue = useMemo(
    () =>
      formattedStations.find(
        (station: IStations) => station.id === crrReportData?.station_id
      ) ?? crrReportData?.station_id,
    [formattedStations, crrReportData]
  )
  const stationRocValue = useMemo(
    () =>
      formattedStations.find(
        (station: IStations) => station.id === rocReportData?.station_id
      ) ?? rocReportData?.station_id,
    [formattedStations, rocReportData]
  )

  useEffect(() => {
    if (
      loadingPositions ||
      loadingDesignations ||
      loadingStations 
    ) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [
    loadingPositions,
    loadingDesignations,
    loadingStations
  ])

  useEffect(() => {
    fetchPositions()
    fetchDesignations()
    fetchStations()
  }, [accessToken])

  useEffect(() => {
    setLoadingPositions(true)
    if (positions) {
      setFormattedPositions(
        positions.map((position) => ({
          id: position.id,
          label: position.position_name,
        }))
      )
    }
    setLoadingPositions(false)
  }, [positions])

  useEffect(() => {
    setLoadingDesignations(true)
    if (designations) {
      setFormattedDesignations(
        designations.map((designation) => ({
          id: designation.id,
          label: designation.designation_name,
        }))
      )
    }
    setLoadingDesignations(false)
  }, [designations])

  useEffect(() => {
    setLoadingStations(true)
    if (stations) {
      setFormattedStations(
        stations.map((station) => ({
          id: station.id,
          label: station.station_name,
        }))
      )
    }
    setLoadingStations(false)
  }, [stations])

  useEffect(() => {
    formData?.report_module?.map((report: IReportModule) => {
      if (report.report === 'cash_receipts_record') {
        setCrrReportData(report)
      } else if (report.report === 'report_collection') {
        setRocReportData(report)
      }
    })
  }, [formData])

  const fetchPositions = () => {
    setLoadingPositions(true)
    if (accessToken) {
      API.getPositions(accessToken)
        .then((response) => {
          const res = response?.data.data
          setPositions(res)
          setLoadingPositions(false)
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ??
              'An error occured while fetching positions'
          )
          setLoadingPositions(false)
        })
    }
  }

  const fetchDesignations = () => {
    setLoadingDesignations(true)
    if (accessToken) {
      API.getDesignations(accessToken)
        .then((response) => {
          const res = response?.data.data
          setDesignations(res)
          setLoadingDesignations(false)
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ??
              'An error occured while fetching designations'
          )
          setLoadingDesignations(false)
        })
    }
  }

  const fetchStations = () => {
    setLoadingStations(true)
    if (accessToken) {
      API.getStations(accessToken)
        .then((response) => {
          const res = response?.data.data
          setStations(res)
          setLoadingStations(false)
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ??
              'An error occured while fetching stations'
          )
          setLoadingStations(false)
        })
    }
  }

  const handleAutocompletChange = (
    report: ReportTypes, 
    name: 'position_id' | 'designation_id' | 'station_id', 
    value: string) => {
    const updatedReportModule = formData?.report_module?.map((reportModule: IReportModule) => {
      if (reportModule.report === report) {
        return { ...reportModule, [name]: value };
      }
      return reportModule;
    })

    handleInputChange('report_module', updatedReportModule as any[])
  }

  if (loading) return <SectionLoader />

  return (
    <>
      <Stack 
        border={1} 
        borderRadius={3} 
        p={2} 
        borderColor='divider'
        gap={2}
      >
        <Typography variant='h5'
        ><PermContactCalendarIcon />&nbsp;Details</Typography>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='signatory_name'
          label='Signatory Name'
          name='signatory_name'
          autoComplete=''
          size='small'
          focused
          autoFocus
          value={formData?.signatory_name ?? ''}
          onChange={e => handleInputChange(e.target.name, e.target.value)}
        />

        {dialogType === 'update' && (
          <FormControl component='fieldset' variant='standard'>
            <FormControlLabel
              control={
                <Switch
                  checked={!!formData?.is_active ?? false}
                  color='primary'
                  id='is_active'
                  name='is_active'
                  required
                  inputProps={{ 'aria-label': 'controlled' }}
                  onChange={e => handleInputChange(e.target.name, e.target.checked)}
                />
              }
              label='Is Active?'
              labelPlacement='start'
            />
          </FormControl>
        )}
      </Stack>

      <Stack 
        border={1} 
        borderRadius={3} 
        p={2} 
        borderColor='divider'
        gap={2}
      >
        <Typography variant='h5'
        ><AssessmentIcon />&nbsp;Reports</Typography>
        {reportInputs.map(reportInput => {
          let positionValue = ''
          let designationValue = ''
          let stationValue = ''

          if (reportInput.id === 'cash_receipts_record') {
            positionValue = positionCrrValue
            designationValue = designationCrrValue
            stationValue = stationCrrValue
          } else if (reportInput.id === 'report_collection') {
            positionValue = positionRocValue
            designationValue = designationRocValue
            stationValue = stationRocValue
          }

          return (
            <Stack key={reportInput.id} mt={1}>
              <Typography 
                variant='h6' 
                fontWeight={500}
              >{reportInput.label}</Typography>
              <Divider  />
              <Stack gap={2} my={2}>
                <Autocomplete
                  freeSolo
                  id={`sel-position-${reportInput.id}`}
                  options={formattedPositions}
                  fullWidth
                  clearOnBlur
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Position'
                      name='position_id'
                      size='small'
                      focused
                      fullWidth
                    />
                  )}
                  autoFocus
                  autoHighlight
                  isOptionEqualToValue={(option: any, value: any) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option: any) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue
                    }
                    // Regular option
                    return option.label
                  }}
                  renderOption={(props: any, option: any) => {
                    delete props['key']
                    return (
                      <li key={option.label} {...props}>
                        {option.label}
                      </li>
                    )
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params)

                    const { inputValue } = params
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.label
                    )
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        label: `Add "${inputValue}"`,
                      })
                    }

                    return filtered
                  }}
                  value={positionValue}
                  onChange={(e: any, newValue: any) => {
                    handleAutocompletChange(
                      reportInput.id, 
                      'position_id', 
                      newValue?.id ?? newValue?.inputValue ?? ''
                    )
                  }}
                />

                <Autocomplete
                  freeSolo
                  id={`sel-designation-${reportInput.id}`}
                  options={formattedDesignations}
                  fullWidth
                  clearOnBlur
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Designation'
                      name='designation_id'
                      size='small'
                      focused
                      fullWidth
                    />
                  )}
                  autoFocus
                  autoHighlight
                  isOptionEqualToValue={(option: any, value: any) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option: any) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue
                    }
                    // Regular option
                    return option.label
                  }}
                  renderOption={(props: any, option: any) => {
                    delete props['key']
                    return (
                      <li key={option.label} {...props}>
                        {option.label}
                      </li>
                    )
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params)

                    const { inputValue } = params
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.label
                    )
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        label: `Add "${inputValue}"`,
                      })
                    }

                    return filtered
                  }}
                  value={designationValue}
                  onChange={(e: any, newValue: any) => {
                    handleAutocompletChange(
                      reportInput.id, 
                      'designation_id', 
                      newValue?.id ?? newValue?.inputValue ?? ''
                    )
                  }}
                />

                <Autocomplete
                  freeSolo
                  id={`sel-station-${reportInput.id}`}
                  options={formattedStations}
                  fullWidth
                  clearOnBlur
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Station'
                      name='staion_id'
                      size='small'
                      focused
                      fullWidth
                    />
                  )}
                  autoFocus
                  autoHighlight
                  isOptionEqualToValue={(option: any, value: any) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option: any) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue
                    }
                    // Regular option
                    return option.label
                  }}
                  renderOption={(props: any, option: any) => {
                    delete props['key']
                    return (
                      <li key={option.label} {...props}>
                        {option.label}
                      </li>
                    )
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params)

                    const { inputValue } = params
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.label
                    )
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        label: `Add "${inputValue}"`,
                      })
                    }

                    return filtered
                  }}
                  value={stationValue}
                  onChange={(e: any, newValue: any) => {
                    handleAutocompletChange(
                      reportInput.id, 
                      'station_id', 
                      newValue?.id ?? newValue?.inputValue ?? ''
                    )
                  }}
                />
              </Stack>
            </Stack>
          )
        })}
      </Stack>
    </>
  )
}

export default Signatory
