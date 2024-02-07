import React, { useState } from 'react'
import { ISystemDialogProps } from '@/Interfaces'
import { 
  Button,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Stack, 
  useMediaQuery 
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import LogoutContent from './LogoutContent'

const SystemDialog = ({
  open,
  title,
  formData,
  dialogType,
  handleClose,
  handleLogout,
  handleCreate,
  handleUpdate,
  handleDelete
}: ISystemDialogProps) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [data, setData] = useState<any>(formData)

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
    >
      <DialogTitle fontWeight={600} my={1}>{title}</DialogTitle>
      
      <DialogContent sx={{ width: { xs: 'initial', sm: 500}, my: 1 }}>
        <Stack gap={3}>  
          {dialogType === 'logout' && <LogoutContent />}
        </Stack>  
      </DialogContent>

      <DialogActions sx={{ mb: 1, mr: 1 }}>
        <Button 
          onClick={() => {
            setData(null)
            handleClose()
          }} 
          autoFocus
          sx={theme => ({ color: theme.palette.text.primary })}
        >
          Cancel
        </Button>

        {dialogType === 'logout' && (
          <Button 
            sx={theme => ({ color: theme.palette.error.main })}
            onClick={() => {
              handleLogout && handleLogout()
              handleClose()
            }} 
            autoFocus
          >
            Logout
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default SystemDialog