import React, { useEffect, useState } from 'react'
import {
  IDesignations,
  IPositions,
  IReportModule,
  ISignatoriesSubContentProps,
  IStations,
  SignatoryTypes,
} from '@/Interfaces'
import useAccessToken from '@/hooks/useAccessToken'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import SectionLoader from '@/components/Loader/SectionLoader'
import {
  Divider,
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import DynamicAutocomplete from '@/components/Common/DynamicAutocomplete'

interface ReportSubInputs {
  id: SignatoryTypes
  label: string
}

type ReportTypes = 'cash_receipts_record' | 'report_collection'

interface ReportInputs {
  id: ReportTypes
  label: string
  sub_inputs: ReportSubInputs[]
}

const Signatory = ({
  formData,
  dialogType,
  handleInputChange,
}: ISignatoriesSubContentProps) => {
  const { accessToken } = useAccessToken()
  const [positions, setPositions] = useState<IPositions[]>()
  const [designations, setDesignations] = useState<IDesignations[]>()
  const [stations, setStations] = useState<IStations[]>()
  const [crrCertifiedReportData, setCrrCertifiedReportData] =
    useState<IReportModule>({
      report: 'crr_certified_correct',
      is_enabled: false,
      position_id: '',
      designation_id: '',
      station_id: '',
    })
  const [rocCertifiedReportData, setRocCertifiedReportData] =
    useState<IReportModule>({
      report: 'roc_certified_correct',
      is_enabled: false,
      position_id: '',
      designation_id: '',
      station_id: '',
    })
  const [rocNotedReportData, setRocNotedReportData] = useState<IReportModule>({
    report: 'roc_noted_by',
    is_enabled: false,
    position_id: '',
    designation_id: '',
    station_id: '',
  })
  const [formattedPositions, setFormattedPositions] = useState<any>([])
  const [formattedDesignations, setFormattedDesignations] = useState<any>([])
  const [formattedStations, setFormattedStations] = useState<any>([])
  const [loadingPositions, setLoadingPositions] = useState<boolean>(true)
  const [loadingDesignations, setLoadingDesignations] = useState<boolean>(true)
  const [loadingStations, setLoadingStations] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [crrCertifiedReportEnabled, setCrrCertifiedReportEnabled] =
    useState(false)
  const [rocCertifiedReportEnabled, setRocCertifiedReportEnabled] =
    useState(false)
  const [rocNotedReportEnabled, setRocNotedReportEnabled] = useState(false)
  const [reportInputs, setReportInputs] = useState<ReportInputs[]>([
    {
      id: 'cash_receipts_record',
      label: 'Cash Receipts Record',
      sub_inputs: [
        {
          id: 'crr_certified_correct',
          label: 'Certified Corrected By',
        },
      ],
    },
    {
      id: 'report_collection',
      label: 'Report of Collection',
      sub_inputs: [
        {
          id: 'roc_certified_correct',
          label: 'Certified Corrected By',
        },
        {
          id: 'roc_noted_by',
          label: 'Noted By',
        },
      ],
    },
  ])

  useEffect(() => {
    if (loadingPositions || loadingDesignations || loadingStations) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [loadingPositions, loadingDesignations, loadingStations])

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
      if (report.report === 'crr_certified_correct') {
        setCrrCertifiedReportEnabled(report.is_enabled)
        setCrrCertifiedReportData(report)
      } else if (report.report === 'roc_certified_correct') {
        setRocCertifiedReportEnabled(report.is_enabled)
        setRocCertifiedReportData(report)
      } else if (report.report === 'roc_noted_by') {
        setRocNotedReportEnabled(report.is_enabled)
        setRocNotedReportData(report)
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

  const handleReportFieldsChange = (
    report: SignatoryTypes,
    name: 'is_enabled' | 'position_id' | 'designation_id' | 'station_id',
    value: string | boolean
  ) => {
    const updatedReportModule = formData?.report_module?.map(
      (reportModule: IReportModule) => {
        if (
          reportModule.report === report &&
          name === 'is_enabled' &&
          value === false
        ) {
          return {
            ...reportModule,
            is_enabled: false,
            position_id: '',
            designation_id: '',
            station_id: '',
          }
        }

        if (reportModule.report === report) {
          return { ...reportModule, [name]: value }
        }
        return reportModule
      }
    )

    handleInputChange('report_module', updatedReportModule as any[])
  }

  if (loading) return <SectionLoader />

  return (
    <>
      <Stack border={1} borderRadius={3} p={2} borderColor='divider' gap={2}>
        <Typography variant='h6'>Details</Typography>
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
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
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
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.checked)
                  }
                />
              }
              label='Is Active?'
              labelPlacement='start'
            />
          </FormControl>
        )}
      </Stack>

      <Stack gap={2}>
        {reportInputs.map((reportInput: ReportInputs) => {
          return (
            <Stack
              key={reportInput.id}
              border={1}
              borderRadius={3}
              p={2}
              borderColor='divider'
            >
              <Typography variant='h6' fontWeight={500}>
                {reportInput.label}
              </Typography>
              <Divider sx={{ my: 2 }} />
              {reportInput.sub_inputs.map((subInputs: ReportSubInputs) => {
                let isReportEnabled = false
                let positionValue = ''
                let designationValue = ''
                let stationValue = ''

                if (subInputs.id === 'crr_certified_correct') {
                  isReportEnabled = crrCertifiedReportEnabled
                  positionValue = crrCertifiedReportData?.position_id
                  designationValue = crrCertifiedReportData?.designation_id
                  stationValue = crrCertifiedReportData?.station_id
                } else if (subInputs.id === 'roc_certified_correct') {
                  isReportEnabled = rocCertifiedReportEnabled
                  positionValue = rocCertifiedReportData?.position_id
                  designationValue = rocCertifiedReportData?.designation_id
                  stationValue = rocCertifiedReportData?.station_id
                } else if (subInputs.id === 'roc_noted_by') {
                  isReportEnabled = rocNotedReportEnabled
                  positionValue = rocNotedReportData?.position_id
                  designationValue = rocNotedReportData?.designation_id
                  stationValue = rocNotedReportData?.station_id
                }
                return (
                  <Stack key={subInputs.id} mt={1}>
                    <FormControl component='fieldset' variant='standard'>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isReportEnabled ?? false}
                            color='primary'
                            name='is_enabled'
                            size='small'
                            inputProps={{ 'aria-label': 'controlled' }}
                            onChange={(e) =>
                              handleReportFieldsChange(
                                subInputs.id,
                                'is_enabled',
                                e.target.checked
                              )
                            }
                          />
                        }
                        label={subInputs.label}
                        labelPlacement='end'
                        sx={{
                          mb: 1,
                          '&>span': {
                            fontSize: '0.9rem',
                            fontWeight: 500,
                          },
                        }}
                      />
                    </FormControl>
                    {isReportEnabled ? (
                      <Stack gap={2} my={2}>
                        <DynamicAutocomplete
                          id='position_id'
                          name='position_id'
                          label='Position'
                          data={formattedPositions}
                          value={positionValue}
                          handleChange={(e: any, newValue: any) => {
                            handleReportFieldsChange(
                              subInputs.id,
                              'position_id',
                              newValue?.id ?? newValue?.inputValue ?? ''
                            )
                          }}
                        />
                        <DynamicAutocomplete
                          id='designation_id'
                          name='designation_id'
                          label='Designation'
                          data={formattedDesignations}
                          value={designationValue}
                          handleChange={(e: any, newValue: any) => {
                            handleReportFieldsChange(
                              subInputs.id,
                              'designation_id',
                              newValue?.id ?? newValue?.inputValue ?? ''
                            )
                          }}
                        />
                        <DynamicAutocomplete
                          id='staion_id'
                          name='staion_id'
                          label='Station'
                          data={formattedStations}
                          value={stationValue}
                          handleChange={(e: any, newValue: any) => {
                            handleReportFieldsChange(
                              subInputs.id,
                              'station_id',
                              newValue?.id ?? newValue?.inputValue ?? ''
                            )
                          }}
                        />
                      </Stack>
                    ) : (
                      <Typography variant='overline' ml={2}>
                        Disabled
                      </Typography>
                    )}
                  </Stack>
                )
              })}
            </Stack>
          )
        })}
      </Stack>
    </>
  )
}

export default Signatory
