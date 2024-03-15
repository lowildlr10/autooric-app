import React, { useEffect, useMemo, useState } from 'react'
import {
  IDesignations,
  IPositions,
  IStations,
  IUserSubContentProps,
} from '@/Interfaces'
import {
  Autocomplete,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  createFilterOptions,
} from '@mui/material'
import useAccessToken from '@/hooks/useAccessToken'
import API from '@/utilities/API'
import toast from 'react-hot-toast'
import SectionLoader from '@/components/Loader/SectionLoader'
import DynamicAutocomplete from '@/components/Common/DynamicAutocomplete'

const filter = createFilterOptions<any>()

const User = ({ formData, handleInputChange }: IUserSubContentProps) => {
  const { accessToken } = useAccessToken()
  const [loading, setLoading] = useState<boolean>(true)
  const [positions, setPositions] = useState<IPositions[]>()
  const [designations, setDesignations] = useState<IDesignations[]>()
  const [stations, setStations] = useState<IStations[]>()
  const [formattedPosition, setFormattedPosition] = useState<any>([])
  const [formattedDesignation, setFormattedDesignation] = useState<any>([])
  const [formattedStation, setFormattedStation] = useState<any>([])
  const positionValue = useMemo(
    () =>
      formattedPosition.find(
        (position: any) => position.id === formData?.position_id
      ) ?? formData?.position_id,
    [formattedPosition, formData?.position_id]
  )
  const designationValue = useMemo(
    () =>
      formattedDesignation.find(
        (position: any) => position.id === formData?.designation_id
      ) ?? formData?.designation_id,
    [formattedDesignation, formData?.designation_id]
  )
  const stationValue = useMemo(
    () =>
      formattedStation.find(
        (position: any) => position.id === formData?.station_id
      ) ?? formData?.station_id,
    [formattedStation, formData?.station_id]
  )

  useEffect(() => {
    fetchPositions()
  }, [accessToken])

  useEffect(() => {
    fetchDesignations()
  }, [accessToken])

  useEffect(() => {
    fetchStations()
  }, [accessToken])

  useEffect(() => {
    setLoading(true)
    if (positions) {
      setFormattedPosition(
        positions.map((position) => ({
          id: position.id,
          label: position.position_name,
        }))
      )
    }
    setLoading(false)
  }, [positions])

  useEffect(() => {
    setLoading(true)
    if (designations) {
      setFormattedDesignation(
        designations.map((designation) => ({
          id: designation.id,
          label: designation.designation_name,
        }))
      )
    }
    setLoading(false)
  }, [designations])

  useEffect(() => {
    setLoading(true)
    if (stations) {
      setFormattedStation(
        stations.map((station) => ({
          id: station.id,
          label: station.station_name,
        }))
      )
    }
    setLoading(false)
  }, [stations])

  const fetchPositions = () => {
    setLoading(true)
    if (accessToken) {
      API.getPositions(accessToken)
        .then((response) => {
          const res = response?.data.data
          setPositions(res)
          setLoading(false)
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ??
              'An error occured while fetching positions'
          )
          setLoading(false)
        })
    }
  }

  const fetchDesignations = () => {
    setLoading(true)
    if (accessToken) {
      API.getDesignations(accessToken)
        .then((response) => {
          const res = response?.data.data
          setDesignations(res)
          setLoading(false)
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ??
              'An error occured while fetching designations'
          )
          setLoading(false)
        })
    }
  }

  const fetchStations = () => {
    setLoading(true)
    if (accessToken) {
      API.getStations(accessToken)
        .then((response) => {
          const res = response?.data.data
          setStations(res)
          setLoading(false)
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ??
              'An error occured while fetching stations'
          )
          setLoading(false)
        })
    }
  }

  if (loading) return <SectionLoader />

  return (
    <>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='first_name'
        label='First Name'
        name='first_name'
        autoComplete=''
        size='small'
        focused
        autoFocus
        value={formData?.first_name ?? ''}
        onChange={(e) =>
          handleInputChange && handleInputChange(e.target.name, e.target.value)
        }
        sx={{ m: 0 }}
      />

      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        id='middle_name'
        label='Middle Name'
        name='middle_name'
        autoComplete=''
        size='small'
        focused
        value={formData?.middle_name ?? ''}
        onChange={(e) =>
          handleInputChange && handleInputChange(e.target.name, e.target.value)
        }
        sx={{ m: 0 }}
      />

      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='last_name'
        label='Last Name'
        name='last_name'
        autoComplete=''
        size='small'
        focused
        value={formData?.last_name ?? ''}
        onChange={(e) =>
          handleInputChange && handleInputChange(e.target.name, e.target.value)
        }
        sx={{ m: 0 }}
      />

      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        id='email'
        label='Email'
        name='email'
        autoComplete=''
        size='small'
        focused
        value={formData?.email ?? ''}
        onChange={(e) =>
          handleInputChange && handleInputChange(e.target.name, e.target.value)
        }
        sx={{ m: 0 }}
      />

      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        id='phone'
        label='Phone'
        name='phone'
        autoComplete=''
        size='small'
        focused
        value={formData?.phone ?? ''}
        onChange={(e) =>
          handleInputChange && handleInputChange(e.target.name, e.target.value)
        }
        sx={{ m: 0 }}
      />

      <DynamicAutocomplete
        id='position_id'
        name='position_id'
        label='Position'
        data={formattedPosition}
        value={formData?.position_id}
        handleChange={(e: any, newValue: any) => {
          handleInputChange &&
            handleInputChange(
              'position_id',
              newValue?.id ?? newValue?.inputValue ?? ''
            )
        }}
        required
      />

      <DynamicAutocomplete
        id='designation_id'
        name='designation_id'
        label='Designation'
        data={formattedDesignation}
        value={formData?.designation_id}
        handleChange={(e: any, newValue: any) => {
          handleInputChange &&
            handleInputChange(
              'designation_id',
              newValue?.id ?? newValue?.inputValue ?? ''
            )
        }}
        required
      />

      <DynamicAutocomplete
        id='station_id'
        name='station_id'
        label='Station'
        data={formattedStation}
        value={formData?.station_id}
        handleChange={(e: any, newValue: any) => {
          handleInputChange &&
            handleInputChange(
              'station_id',
              newValue?.id ?? newValue?.inputValue ?? ''
            )
        }}
        required
      />

      <Divider />

      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        id='username'
        label='Username'
        name='username'
        autoComplete=''
        size='small'
        focused
        required
        value={formData?.username ?? ''}
        onChange={(e) =>
          handleInputChange && handleInputChange(e.target.name, e.target.value)
        }
        sx={{ m: 0 }}
      />

      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        id='password'
        label='Password'
        name='password'
        autoComplete=''
        size='small'
        type='password'
        focused
        required
        value={formData?.password ?? ''}
        onChange={(e) =>
          handleInputChange && handleInputChange(e.target.name, e.target.value)
        }
        sx={{ m: 0 }}
      />

      <FormControl focused required size='small'>
        <InputLabel id='sel-role-label'>Role</InputLabel>
        <Select
          labelId='sel-role-label'
          id='sel-role'
          name='role'
          value={formData?.role ?? 'staff'}
          label='Role'
          required
          onChange={(e) =>
            handleInputChange &&
            handleInputChange(e.target.name, e.target.value)
          }
        >
          <MenuItem value='admin'>Admin</MenuItem>
          <MenuItem value='staff'>Staff</MenuItem>
        </Select>
      </FormControl>

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
                handleInputChange &&
                handleInputChange(e.target.name, e.target.checked)
              }
            />
          }
          label='Is Active?'
          labelPlacement='start'
        />
      </FormControl>
    </>
  )
}

export default User
