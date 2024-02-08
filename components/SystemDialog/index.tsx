import React from 'react'
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
import PrintContent from './PrintContent'
import CreateContent from './CreateContent'

const SystemDialog = ({
  open,
  title,
  formData,
  printUrl,
  dialogType,
  content,
  handleClose,
  handleLogout,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleClear,
  handleInputChange
}: ISystemDialogProps) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullScreen={fullScreen || dialogType === 'print'}
      open={open}
    >
      <DialogTitle fontWeight={600} my={1}>{title}</DialogTitle>
      
      <DialogContent sx={{ width: { xs: 'initial', sm: 500}, my: 1 }}>
        <Stack py={2} px={3} gap={4}>  
          {dialogType === 'logout' && <LogoutContent />}
          {dialogType === 'print' && printUrl && <PrintContent printUrl={printUrl} />}
          {dialogType === 'create' && content && handleInputChange && (
            <CreateContent 
              content={content} 
              formData={formData} 
              handleInputChange={handleInputChange}
            />
          )}
        </Stack>  
      </DialogContent>

      <DialogActions sx={{ mb: 1, mr: 1 }}>
        <Button 
          onClick={() => {
            handleClear && handleClear()
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

        {dialogType === 'create' && (
          <Button 
            onClick={() => {
              handleCreate && handleCreate(formData)
              handleClose()
            }} 
            autoFocus
          >
            Create
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default SystemDialog