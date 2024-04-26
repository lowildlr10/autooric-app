import React from 'react'
import { ISystemDialogProps } from '@/Interfaces'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import LogoutContent from './LogoutContent'
import PrintContent from './PrintContent'
import CreateContent from './CreateContent'
import CancelContent from './CancelContent'
import DepositContent from './DepositContent'
import UpdateContent from './UpdateContent'
import PrintPreviewContent from './PrintPreviewContent'
import RevertContent from './RevertContent'

const SystemDialog = ({
  open,
  id,
  title,
  formData,
  printUrl,
  dialogType,
  content,
  handleClose,
  handleLogout,
  handleCreate,
  handleUpdate,
  handleCancel,
  handleShowDelete,
  handleDelete,
  handleDeposit,
  handleClear,
  handleRevert,
  handleDownload,
  handlePrint,
  handleInputChange,
}: ISystemDialogProps) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullScreen={
        fullScreen || dialogType === 'print' || dialogType === 'print_preview'
      }
      open={open}
    >
      <DialogTitle fontWeight={600} my={1}>
        {title}
      </DialogTitle>

      <DialogContent
        sx={{
          width: {
            xs: 'initial',
            sm:
              fullScreen ||
              dialogType === 'print' ||
              dialogType === 'print_preview'
                ? 'initial'
                : 500,
          },
          my: 1,
        }}
      >
        <Stack py={2} px={3} gap={4}>
          {dialogType === 'logout' && <LogoutContent />}
          {dialogType === 'print' && printUrl && (
            <PrintContent printUrl={printUrl} />
          )}
          {dialogType === 'print_preview' && (
            <PrintPreviewContent
              content={content ?? 'print_report_collection'}
              printPreviewData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {dialogType === 'cancel' && <CancelContent />}
          {dialogType === 'deposit' && (
            <DepositContent
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {dialogType === 'revert' && <RevertContent />}
          {dialogType === 'create' && content && handleInputChange && (
            <CreateContent
              dialogType={dialogType}
              content={content}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}

          {dialogType === 'update' && content && handleInputChange && (
            <UpdateContent
              dialogType={dialogType}
              content={content}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}

          {dialogType === 'delete' && (
            <>Are you sure you want to delete this record?</>
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
          sx={(theme) => ({ color: theme.palette.text.primary })}
        >
          Close
        </Button>

        {dialogType === 'logout' && (
          <Button
            sx={(theme) => ({ color: theme.palette.error.main })}
            onClick={() => {
              handleLogout && handleLogout()
              handleClose()
            }}
            autoFocus
          >
            Logout
          </Button>
        )}

        {dialogType === 'print' && (
          <Button
            sx={(theme) => ({ color: theme.palette.primary.main })}
            onClick={() => handleDownload && handleDownload()}
            autoFocus
          >
            Download
          </Button>
        )}

        {dialogType === 'print_preview' && (
          <Button
            sx={(theme) => ({ color: theme.palette.primary.main })}
            onClick={() => handlePrint && handlePrint()}
            autoFocus
          >
            Print
          </Button>
        )}

        {dialogType === 'cancel' && (
          <Button
            onClick={() => {
              handleCancel && handleCancel(id ?? '')
              handleClose()
            }}
            autoFocus
            sx={{
              color: 'error.main',
            }}
          >
            Cancel
          </Button>
        )}

        {dialogType === 'deposit' && (
          <Button
            onClick={() => {
              handleDeposit && handleDeposit(formData)
              handleClose()
            }}
            autoFocus
            sx={{
              color: 'secondary.dark',
            }}
          >
            Deposit
          </Button>
        )}

        {dialogType === 'revert' && (
          <Button
            onClick={() => {
              handleRevert && handleRevert(id ?? '')
              handleClose()
            }}
            autoFocus
            sx={{
              color: 'info',
            }}
          >
            Revert
          </Button>
        )}

        {dialogType === 'delete' && (
          <Button
            onClick={() => {
              handleDelete && handleDelete(id ?? '')
              handleClose()
            }}
            autoFocus
            sx={{
              color: 'error.main',
            }}
          >
            Delete
          </Button>
        )}

        {dialogType === 'update' && (
          <>
            {content !== 'signatories' && (
              <Button
                onClick={() => {
                  handleShowDelete && handleShowDelete()
                }}
                autoFocus
                sx={{
                  color: 'error.main',
                }}
              >
                Delete
              </Button>
            )}

            <Button
              onClick={() => {
                handleUpdate && handleUpdate(formData)
                handleClose()
              }}
              autoFocus
              sx={{
                color: 'warning.main',
              }}
            >
              Update
            </Button>
          </>
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
